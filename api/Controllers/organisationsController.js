import { sqlPool } from '../Utils/DbUtils.js';

export const createOrg = async (req, res) => {
    var query = 'call create_organization_and_admin($1,$2)';
    var params = [req.user, req.header('Organization')];
    if (!params[0] || !params[1])
        res.status(500).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then(() =>
                res.status(200).json({
                    message: `${params[1]} has been created successfully`,
                })
            )
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    error: 'Organization name already exists',
                });
            });
    }
};

export const getMyOrgs = async (req, res) => {
    var query =
        'Select DISTINCT (organization_name, space_name) FROM user_space_organization_permissions where username=$1';
    var params = [req.user];
    if (!params[0]) res.status(500).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => res.status(200).json(sqlRes.rows))
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
};
