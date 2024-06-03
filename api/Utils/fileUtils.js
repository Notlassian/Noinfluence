import * as fs from 'node:fs';
import * as path from 'path';
import {
    DeleteObjectCommand,
    GetObjectCommand,
    HeadObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { sqlPool } from './dbUtils.js';

const environments = {
    PROD: 'PROD',
};

const { PAGE_BUCKET: bucket } = process.env;
const localDir = 'savedFiles';
const s3Client = new S3Client([{ region: 'eu-west-1' }]);

async function uploadToS3(file, fileId, folder) {
    const key = [folder, fileId].join('/');

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
    });

    await s3Client.send(command);

    return key;
}

function checkSafeFilePath(...paths) {
    const normalizedPath = path.normalize(path.join(...paths));
    console.log(paths);

    if (!normalizedPath.startsWith(localDir)) {
        throw new Error('Path error');
    }
}

function storeLocally(file, fileId, folder) {
    checkSafeFilePath(localDir, folder, fileId);

    const folderDir = path.join(localDir, folder);
    const filePath = path.join(folderDir, fileId);

    if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file, { flag: 'w' });

    return filePath;
}

async function retrieveFromS3(key) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
    });

    const response = await s3Client.send(command);
    return await response.Body.transformToString();
}

function retrieveLocally(filePath) {
    checkSafeFilePath(filePath);
    return fs.readFileSync(filePath, 'utf8');
}

export async function storePage(
    file,
    orgName,
    spaceName,
    folderName,
    pageName,
    update = false
) {
    const environment = process.env.APP_ENVIRONMENT;
    const folder = `${orgName}/${spaceName}/${folderName}`;
    const fileId = `${pageName}.md`;
    let fileLocation;

    switch (environment) {
        case environments.PROD: {
            fileLocation = await uploadToS3(file, fileId, folder);
            break;
        }
        default: {
            fileLocation = storeLocally(file, fileId, folder);
        }
    }

    if (!update) {
        const query = 'call insert_page($1,$2,$3,$4,$5)';
        const params = [pageName, fileLocation, folderName, spaceName, orgName];

        try {
            await sqlPool.query(query, params);
        } catch (error) {
            deleteFile(fileLocation);
            throw error;
        }
    }

    return fileLocation;
}

export async function retrievePage(filePath) {
    const environment = process.env.APP_ENVIRONMENT;

    switch (environment) {
        case environments.PROD: {
            return await retrieveFromS3(filePath);
        }
        default: {
            return retrieveLocally(filePath);
        }
    }
}

async function checkIfFileExistsS3(folder, fileId) {
    const key = [folder, fileId].join('/');
    const command = new HeadObjectCommand({ Bucket: bucket, Key: key });
    try {
        await s3Client.send(command);
    } catch (error) {
        if (error['$metadata'].httpStatusCode === 404) {
            return false;
        } else {
            throw error;
        }
    }

    return true;
}

function checkIfFileExistsLocal(folder, fileId) {
    const filePath = path.join(localDir, folder, fileId);
    return fs.existsSync(filePath);
}

export async function checkIfFileExists(
    orgName,
    spaceName,
    folderName,
    pageName
) {
    const folder = `${orgName}/${spaceName}/${folderName}`;
    const fileId = `${pageName}.md`;

    const environment = process.env.APP_ENVIRONMENT;

    switch (environment) {
        case environments.PROD: {
            return checkIfFileExistsS3(folder, fileId);
        }
        default: {
            return checkIfFileExistsLocal(folder, fileId);
        }
    }
}

async function deleteFileS3(path) {
    const command = new DeleteObjectCommand({ Bucket: bucket, Key: path });
    try {
        await s3Client.send(command);
    } catch (error) {
        console.error(`File not deleted. Key: ${path}`);
        throw error;
    }
}

function deleteFileLocal(path) {
    try {
        fs.rmSync(path);
    } catch (error) {
        console.error(`File not deleted. Path: ${path}`);
        throw error;
    }
}

function deleteFile(path) {
    const environment = process.env.APP_ENVIRONMENT;

    switch (environment) {
        case environments.PROD: {
            return deleteFileS3(path);
        }
        default: {
            return deleteFileLocal(path);
        }
    }
}
