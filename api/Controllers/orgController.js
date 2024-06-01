import { sqlPool } from '../Utils/dbUtils.js';
import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';
import { buildUniqueMap } from '../Utils/mapUtils.js';

export const createOrg = async (req, res) => {
    var query = 'call create_organization_and_admin($1,$2)';
    var params = [req.user, req.body.org];
    if (!params[0] || !params[1])
        res.status(HttpStatusCodes.BadRequest).json({ error: '"org" parameter not found in request body' });
    else {
        sqlPool
            .query(query, params)
            .then(() => {
                res.status(HttpStatusCodes.OK).json({
                    message: `${params[1]} has been created successfully`,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.BadRequest).json({
                    error: 'Organization name already exists',
                });
            });
    }
};

export const getMyOrgs = async (req, res) => {
    var query =
        'Select organization_name, space_name FROM user_space_organization_permissions where username=$1';
    var params = [req.user];
    if (!params[0]) res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                const resMap = buildUniqueMap(
                    sqlRes.rows,
                    'organization_name',
                    'space_name'
                );
                res.status(HttpStatusCodes.OK).json(resMap);
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
            });
    }
};
