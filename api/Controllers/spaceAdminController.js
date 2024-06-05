import { sqlPool } from '../Utils/dbUtils.js';
import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';

export const getSpaceUsers = async (req, res) => {
    const query =
        'Select Distinct(username), role FROM user_space_organization_permissions where organization_name=$1 AND space_name=$2 AND NOT username=$3';
    const params = [req.params.orgName, req.params.spaceName, req.user];
    if (!params[0] || !params[1] || !params[2]) {
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

export const updateUserRole = async (req, res) => {
    const query = 'call update_user_roles_in_space($1, $2, $3, $4)';
    const params = [
        req.body.user,
        req.body.role,
        req.params.spaceName,
        req.params.orgName,
    ];
    if (!params[0] || !params[1] || !params[2] || !params[3]) {
        res.status(HttpStatusCodes.InternalServerError).json({
            error: '"user" and "role" required in request body',
        });
    } else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                res.status(HttpStatusCodes.OK).json({
                    message: `Successfully updated ${params[0]} role to ${params[1]}`,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.BadRequest).json({
                    error: 'Internal Server Error',
                });
            });
    }
};
export const addUserRole = async (req, res) => {
    const query = 'Select Distinct(username), role FROM user_space_organization_permissions where organization_name=$2 AND space_name=$1';
    const params = [
        req.params.spaceName,
        req.params.orgName,
    ];
    if (!req.body.username || !req.body.role) {
        res.status(HttpStatusCodes.InternalServerError).json({
            error: '"username" and "role" required in request body',
        });
    } else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {

                if (sqlRes.rowCount < 25) {
                    const query = 'call add_role_to_user_in_space($1, $2, $3, $4)';
                    const params = [
                        req.body.username,
                        req.body.role,
                        req.params.spaceName,
                        req.params.orgName,
                    ];
                    sqlPool
                        .query(query, params)
                        .then(() => {
                            res.status(HttpStatusCodes.OK).json({
                                message: `Successfully added ${params[0]} to the space as ${params[1]}`,
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(HttpStatusCodes.BadRequest).json({
                                error: 'User already exists in space',
                            });
                        });
                } else {
                    res.status(HttpStatusCodes.NotAcceptable).json({
                        error: 'A space can have a max of 25 users',
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
};
export const checkAdmin = (req, res) => {
    res.status(HttpStatusCodes.OK);
    res.json({ message: 'You are an admin for this space' });
};
