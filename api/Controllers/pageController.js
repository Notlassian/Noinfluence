import {
    checkIfFileExists,
    retrievePage,
    storePage,
} from '../Utils/fileUtils.js';
import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';
import { sqlPool } from '../Utils/dbUtils.js';

export const getPage = async (req, res) => {
    const query =
        'SELECT * from page_details WHERE organization_name = $1 AND space_name = $2 AND folder_name = $3 AND page_name = $4';
    const params = [
        req.params.orgName,
        req.params.spaceName,
        req.params.folderName,
        req.params.pageName,
    ];
    if (!params[0] || !params[1] || !params[2] || !params[3])
        res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });

    sqlPool
        .query(query, params)
        .then(async (sqlRes) => {
            if (sqlRes.rowCount > 0) {
                const { file_path: filePath } = sqlRes.rows[0];

                res.status(HttpStatusCodes.OK).json({
                    pageContent: await retrievePage(filePath),
                });
            } else {
                res.status(HttpStatusCodes.BadRequest).json({
                    error: `Page ${params[2]}/${params[3]} not found in ${params[1]}`,
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatusCodes.InternalServerError).json({
                error: 'Internal Server Error',
            });
        });
};

export const updatePage = async (req, res) => {
    const query =
        'SELECT * from page_details WHERE organization_name = $1 AND space_name = $2 AND folder_name = $3 AND page_name = $4';
    const { spaceName, orgName, folderName, pageName } = req.params;
    const { fileContents } = req.body;

    if (!fileContents) {
        return res.status(HttpStatusCodes.BadRequest).json({
            error: '"fileContents" required in request body',
        });
    }

    if (!orgName || !spaceName || !folderName || !pageName) {
        return res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    }

    const params = [orgName, spaceName, folderName, pageName];

    try {
        const sqlRes = await sqlPool.query(query, params);

        if (sqlRes.rowCount === 0) {
            return res.status(HttpStatusCodes.BadRequest).json({
                error: `Page ${folderName}/${pageName} not found in ${spaceName}`,
            });
        }

        await storePage(
            fileContents,
            orgName,
            spaceName,
            folderName,
            pageName,
            true
        );

        return res.status(HttpStatusCodes.OK).json({
            message: `Page ${folderName}/${pageName} updated successfully`,
        });
    } catch (error) {
        console.error(`Error creating page: ${error}`);

        return res
            .status(HttpStatusCodes.InternalServerError)
            .json({ error: 'An error occurred' });
    }
};

export const createPage = async (req, res) => {
    const { spaceName, orgName, folderName, pageName } = req.params;
    const { fileContents } = req.body;

    if (!fileContents) {
        return res.status(HttpStatusCodes.BadRequest).json({
            error: '"fileContents" required in request body',
        });
    }

    try {
        const fileExists = await checkIfFileExists(
            fileContents,
            orgName,
            spaceName,
            folderName,
            pageName
        );

        if (fileExists) {
            return res.status(HttpStatusCodes.BadRequest).json({
                error: `A page with the name '${pageName}' already exists`,
            });
        }

        await storePage(fileContents, orgName, spaceName, folderName, pageName);
    } catch (error) {
        console.error(`Error creating page: ${error}`);
        return res
            .status(HttpStatusCodes.InternalServerError)
            .json({ error: 'An error occurred' });
    }

    return res.sendStatus(HttpStatusCodes.Created);
};
