import { sqlPool } from '../Utils/dbUtils.js';
import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';
import { buildUniqueMap } from '../Utils/mapUtils.js';

export const createSpace = async (req, res) => {
    const query = 'call insert_space($1,$2)';
    const params = [req.body.space, req.params.orgName];
    if (!params[0] || !params[1])
        res.status(HttpStatusCodes.BadRequest).json({ error: '"space" parameter required in request body' });
    else {
        sqlPool
            .query(query, params)
            .then(() => {
                res.status(HttpStatusCodes.OK).json({
                    message: `${params[0]} in ${params[1]} has been created successfully`,
                })
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.BadRequest).json({
                    error: `${params[0]} already exists in ${params[1]}`,
                });
            });
    }
};

export const getFoldersWithPages = async (req, res) => {
    var query = 'SELECT folder_name, page_name from space_pages_view WHERE organization_name = $1 AND space_name = $2';
    var params = [req.params.orgName, req.params.spaceName];
    if (!params[0] || !params[1])
        res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then(() => {
                const resMap = buildUniqueMap(
                    sqlRes.rows,
                    'folder_name',
                    'page_name'
                );
                res.status(HttpStatusCodes.OK).json(resMap);
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({
                    error: 'Internal Server Error',
                });
            });
    }
};
