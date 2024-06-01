import { sqlPool } from '../Utils/dbUtils.js';

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
    var query = 'SELECT folder';
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
}
