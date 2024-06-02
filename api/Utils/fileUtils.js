import * as fs from 'node:fs';
import * as path from 'path';
import { PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const environments = {
    PROD: 'PROD',
};

const s3Client = new S3Client([{ region: 'eu-west-1' }]);
const localDir = './savedFiles';

async function uploadToS3(file, fileId, folder) {
    const { PAGE_BUCKET: bucket } = process.env;
    const key = path.join(folder, fileId);

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
    });

    await s3Client.send(command);

    return key;
}

function storeLocally(file, fileId, folder) {
    const folderDir = fs.realpathSync(path.resolve(localDir, folder));
    
    const filePath = fs.realpathSync(path.resolve(resolvedFolderDir, fileId));

   if(!filePath.startsWith(localDir)|| !folderDir.startsWith(localDir)) return null;

    if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file, { flag: 'w+' });

    return filePath;
}

async function retrieveFromS3(file, fileId, folder) {
    const { PAGE_BUCKET: bucket } = process.env;
    const key = path.join(folder, fileId);

    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key
    });

    const response = await s3Client.send(command);

    const stream = response.Body;
    let data = '';
    
    if (stream instanceof Readable) {
        for await (const chunk of stream) {
            data += chunk;
        }
    }

    return data;
}

function retrieveLocally(file, fileId, folder) {
    const folderDir = path.join(localDir, folder);
    const filePath = path.join(folderDir, fileId);

    const data = fs.readFileSync(filePath, 'utf8');
    return data;
}

export async function storePage(
    file,
    orgName,
    spaceName,
    folderName,
    pageName
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

    return fileLocation;
}

export async function retrievePage(
    file,
    orgName,
    spaceName,
    folderName,
    pageName
) {
    
    const environment = process.env.APP_ENVIRONMENT;
    const folder = `${orgName}/${spaceName}/${folderName}`;
    const fileId = `${pageName}.md`;
    let fileContents;

    switch (environment) {
        case environments.PROD: {
            fileContents = await retrieveFromS3(file, fileId, folder);
            break;
        }
        default: {
            fileContents = retrieveLocally(file, fileId, folder);
        }
    }

    return fileContents;
}
