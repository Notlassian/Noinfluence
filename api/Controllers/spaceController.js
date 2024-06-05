import { sqlPool } from '../Utils/dbUtils.js';
import { retrievePage, storePage } from '../Utils/fileUtils.js';
import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';
import { buildUniqueMap } from '../Utils/mapUtils.js';

export const createSpace = async (req, res) => {
    const query = 'Select Distinct(username), role FROM user_space_organization_permissions where organization_name=$4 AND space_name=$3';
    const params = [req.user, req.body.space, req.params.orgName];
    if (!params[0] || !params[1] || !params[2]) {
        res.status(HttpStatusCodes.BadRequest).json({
            error: '"space" parameter required in request body',
        });
    } else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                if (sqlRes.rowCount < 10) {
                    query = 'call insert_space($1,$2,$3)';
                    sqlPool
                        .query(query, params)
                        .then(async () => {
                            await storePage(
                                `# Welcome to ${req.body.space}`,
                                req.params.orgName,
                                req.body.space,
                                '',
                                'home'
                            );
                            res.status(HttpStatusCodes.OK).json({
                                message: `${params[0]} in ${params[1]} has been created successfully`,
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(HttpStatusCodes.BadRequest).json({
                                error: `${params[0]} already exists in ${params[1]}`,
                            });
                        });
                } else {
                    res.status(HttpStatusCodes.NotAcceptable).json({
                        error: 'An organisation can have a max of 10 spaces',
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
export const getSpaces = async (req, res) => {
    const query =
        'Select DISTINCT (space_name) FROM user_space_organization_permissions where username=$1 and organization_name=$2';
    const params = [req.user, req.params.orgName];
    if (!params[0] || !params[1])
        res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                const spaceNames = sqlRes.rows.map((space) => space.space_name);
                res.status(HttpStatusCodes.OK).json(spaceNames);
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({
                    error: 'Internal Server Error',
                });
            });
    }
};

export const getFoldersWithPages = async (req, res) => {
    const query =
        'SELECT folder_name, page_name from page_details WHERE organization_name = $1 AND space_name = $2';
    const params = [req.params.orgName, req.params.spaceName];
    if (!params[0] || !params[1])
        res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
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

export const getMyPermissions = async (req, res) => {
    const query =
        'Select DISTINCT (permission_name) FROM user_space_organization_permissions where username=$1 and organization_name=$2 and space_name=$3';
    const params = [req.user, req.params.orgName, req.params.spaceName];
    if (!params[0] || !params[1] || !params[2])
        res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                const permissions = sqlRes.rows.map(
                    (perm) => perm.permission_name
                );
                res.status(HttpStatusCodes.OK).json({ perms: permissions });
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({
                    error: 'Internal Server Error',
                });
            });
    }
};

export const getHome = async (req, res) => {
    try {
        const file_path = `${req.params.orgName}/${req.params.spaceName}/home.md`;

        res.status(HttpStatusCodes.OK).json({
            pageContent: await retrievePage(file_path),
        });
    } catch (error) {
        console.error(error);
        res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    }
};

export const updateHome = async (req, res) => {
    const { spaceName, orgName } = req.params;
    const { pageContent } = req.body;

    if (!pageContent) {
        return res.status(HttpStatusCodes.BadRequest).json({
            error: '"pageContent" required in request body',
        });
    }

    if (!orgName || !spaceName) {
        return res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    }
    try {
        await storePage(pageContent, orgName, spaceName, '', 'home', true);
    } catch {
        return res.status(HttpStatusCodes.InternalServerError).json({
            error: 'Internal Server Error',
        });
    }

    return res.status(HttpStatusCodes.OK).json({
        message: `Homepage updated successfully`,
    });
};
