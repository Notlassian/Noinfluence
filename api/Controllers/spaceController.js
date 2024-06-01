import { sqlPool } from '../Utils/dbUtils.js';
import { buildUniqueMap } from '../Utils/mapUtils.js';

export const createSpace = async (req, res) => {
    var query = 'call insert_space($1,$2)';
    var params = [req.body.Space, req.params.orgName];
    if (!params[0] || !params[1])
        res.status(500).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then(() =>
                res.status(200).json({
                    message: `${params[0]} in ${params[1]} has been created successfully`,
                })
            )
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    error: `${params[0]} in ${params[1]} already exists`,
                });
            });
    }
};

export const getFoldersWithPages = async (req, res) => {
    var query = 'SELECT folder_name, page_name from space_pages_view WHERE organization_name = $1 AND space_name = $2';
    var params = [req.params.orgName, req.params.spaceName];
    if (!params[0] || !params[1])
        res.status(500).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then(() => {
                const resMap = buildUniqueMap(
                    sqlRes.rows,
                    'folder_name',
                    'page_name'
                );
                res.status(200).json(resMap);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    error: `Couldn't access pages for ${params[0]}, ${params[1]}`,
                });
            });
    }
};
