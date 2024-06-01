import { retrievePage, storePage } from "../Utils/fileUtils.js";
import { HttpStatusCodes } from "../Utils/httpStatusCodes.js";

export const getPage = async (req, res) => {
    var query = 'SELECT * from space_pages_view WHERE organization_name = $1 AND space_name = $2 AND folder_name = $3 AND page_name = $4';
    var params = [req.params.orgName, req.params.spaceName, req.params.folderName, req.params.pageName];
    if (!params[0] || !params[1] || !params[2] || !params[3])
        res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                if (sqlRes.rowCount > 0) {
                    res.status(HttpStatusCodes.OK).json({
                        pageContent: retrievePage()
                    });
                } else {
                    res.status(HttpStatusCodes.BadRequest).json({
                        error: `Page ${params[2]}/${params[3]} not found in ${params[1]}`,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({
                    error: 'Internal Server Error',
                });
            });
    }
}

export const updatePage = async (req, res) => {
    var query = 'SELECT * from space_pages_view WHERE organization_name = $1 AND space_name = $2 AND folder_name = $3 AND page_name = $4';
    var params = [req.params.orgName, req.params.spaceName, req.params.folderName, req.params.pageName];
    if (!params[0] || !params[1] || !params[2] || !params[3])
        res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then(async (sqlRes) => {
                if (sqlRes.rowCount > 0) {
                    if (params.body.fileContents) {
                        try {
                            await storePage(params.body.fileContents, params[0], params[1], params[2], params[3]);
                            res.status(HttpStatusCodes.OK).json({
                                message: `Page ${params[2]}/${params[3]} updated successfully`
                            });
                        } catch (err) {
                            console.log(err);
                            res.status(HttpStatusCodes.BadRequest).json({
                                error: `Page ${params[2]}/${params[3]} not found in ${params[1]}`,
                            });
                        }
                    } else {
                        res.status(HttpStatusCodes.BadRequest).json({
                            error: '"fileContents" required in request body',
                        });
                    }
                } else {
                    res.status(HttpStatusCodes.BadRequest).json({
                        error: `Page ${params[2]}/${params[3]} not found in ${params[1]}`,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({
                    error: 'Internal Server Error',
                });
            });
    }
}