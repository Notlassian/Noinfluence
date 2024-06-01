import { sqlPool } from '../Utils/dbUtils.js';
import { buildUniqueMap } from '../Utils/mapUtils.js';

export const getSpaceUsers = async (req, res) => {
    var query =
        'Select username,role FROM user_space_organization_permissions where organization_name=$1 AND space_name=$2';
    var params = [req.params.orgName, req.params.spaceName];
    if (!params[0]) {
        res.status(500).json({ error: 'Internal Server Error' });
    } else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                res.status(200).json(sqlPool.rows);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
};
