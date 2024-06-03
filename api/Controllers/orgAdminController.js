import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';
import { sqlPool } from '../Utils/dbUtils.js';

export const getOrgAdmins = async (req, res) => {
    const query =
        'Select username FROM organization_admins_view where organization_name=$1 AND NOT username=$2';
    const params = [req.params.orgName, req.user];
    if (!params[0] || !params[1]) {
        res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    } else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                res.status(HttpStatusCodes.OK).json(sqlRes.rows);
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({
                    error: 'Internal Server Error',
                });
            });
    }
};

export const addOrgAdmin = async (req, res) => {
    const query = 'call org_add_admin($1, $2)';
    const params = [req.params.orgName, req.body.username];
    if (!params[0] || !params[1]) {
        res.status(HttpStatusCodes.BadRequest).json({
            error: '"username" required in request body',
        });
    } else {
        sqlPool
            .query(query, params)
            .then(() => {
                res.status(HttpStatusCodes.OK).json({
                    message: `Successfully added ${params[1]} as admin to ${params[0]}`,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({
                    error: 'Internal Server Error',
                });
            });
    }
};
export const checkOrgAdmin = (req, res) => {
    res.status(HttpStatusCodes.OK);
    res.json({ message: 'You are an admin for this ORG' });
};
