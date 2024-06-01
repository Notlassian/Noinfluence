import * as fs from 'node:fs';
import * as path from 'path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const environments = {
    PROD: 'PROD',
};

const localDir = './savedFiles';

async function uploadToS3(file, fileId, folder) {
    const { PAGE_BUCKET: bucket } = process.env;
    const s3Client = new S3Client([{ region: 'eu-west-1' }]);
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
    const folderDir = path.join(localDir, folder);
    const filePath = path.join(folderDir, fileId);

    if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file, { flag: 'w+' });

    return filePath;
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
