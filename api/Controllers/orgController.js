import { checkStr } from '../Utils/checkStrAllowed.js';
import { sqlPool } from '../Utils/dbUtils.js';
import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';
import { buildObjectMap, buildUniqueMap } from '../Utils/mapUtils.js';

export const createOrg = async (req, res) => {
    if (!req.body.org.trim()) {
        res.status(HttpStatusCodes.BadRequest).json({
            error: '"org" parameter not found in request body',
        });
    } else {
        if (!checkStr(req.body.org)) {
            res.status(HttpStatusCodes.BadRequest).json({
                error: "Organization name doesn't conform to allowed format",
            });
        } else {
            const query =
                'Select * FROM organization_admins_view where username=$1';
            const params = [req.user];
            sqlPool
                .query(query, params)
                .then((sqlRes) => {
                    if (sqlRes.rowCount < 10) {
                        const query =
                            'call create_organization_and_admin($1,$2)';
                        const params = [req.user, req.body.org.trim()];
                        if (!params[0] || !params[1]) {
                            res.status(HttpStatusCodes.BadRequest).json({
                                error: '"org" parameter not found in request body',
                            });
                        } else {
                            sqlPool
                                .query(query, params)
                                .then(() => {
                                    res.status(HttpStatusCodes.OK).json({
                                        message: `${params[1]} has been created successfully`,
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                    res.status(HttpStatusCodes.BadRequest).json(
                                        {
                                            error: 'Organization name already exists',
                                        }
                                    );
                                });
                        }
                    } else {
                        res.status(HttpStatusCodes.NotAcceptable).json({
                            error: 'Cannot be apart of more than 10 organisations',
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(HttpStatusCodes.InternalServerError).json({
                        error: 'Internal server error',
                    });
                });
        }
    }
};

export const getMyOrgs = async (req, res) => {
    const query =
        'Select organization_name, space_name FROM user_space_organization_permissions where username=$1';
    const params = [req.user];
    if (!params[0])
        res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                const resMap = buildUniqueMap(
                    sqlRes.rows,
                    'organization_name',
                    'space_name'
                );

                // Show orgs that have no spaces
                const query =
                    'Select organization_name FROM organization_admins_view where username=$1';
                sqlPool
                    .query(query, params)
                    .then((sqlAdmins) => {
                        sqlAdmins.rows.forEach((row) => {
                            const key = row.organization_name;
                            if (!resMap[key]) {
                                resMap[key] = [];
                            }
                        });

                        res.status(HttpStatusCodes.OK).json(resMap);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(HttpStatusCodes.InternalServerError).json({
                            error: 'Internal Server Error',
                        });
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

export const getRecentlyUpdatedOrgs = async (req, res) => {
    const query = `
                SELECT
                    pd.page_name,
                    pd.page_created_at,
                    pd.folder_name,
                    pd.space_name,
                    pd.organization_name
                FROM
                    page_details AS pd
                JOIN
                    user_space_organization_permissions AS uso
                ON
                    pd.space_name = uso.space_name
                AND
                    pd.organization_name = uso.organization_name
                WHERE
                    uso.username = $1
                ORDER BY
                    pd.page_created_at DESC
                LIMIT 10;`;
    const params = [req.user];
    if (!params[0])
        res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                const resMap = buildObjectMap(sqlRes.rows, 'organization_name');
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
