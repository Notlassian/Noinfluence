import { sqlPool } from '../Utils/DbUtils.js';

export function hasSpacePermission(requiredPermission) {
    return function (req, res, next) {
        try {
            const query =
                'SELECT * FROM user_space_organization_permissions where username=$1 AND  organization_name=$2 AND space_name=$3 and Permission_name=$4;';
            const vals = [
                req.user || '',
                req.header('Organization') || '',
                req.header('Space') || '',
                requiredPermission,
            ];
            sqlPool
                .query(query, vals)
                .then((dbRes) => {
                    if (dbRes.rowCount > 0) {
                        next();
                    } else {
                        res.status(403).json({
                            error: 'Forbidden: User does not have the required permission',
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        } catch {
            return res.status(401).json({ error: 'Access denied' });
        }
    };
}
//TODO HasOrgPermission
export function isOrgAdmin() {
    return function (req, res, next) {
        try {
            const query = 'SELECT is_user_admin($1,$2)';
            const vals = [req.header('Organization') || '', req.user || ''];
            sqlPool
                .query(query, vals)
                .then((dbRes) => {
                    if (dbRes.rows[0].is_user_admin) {
                        next();
                    } else {
                        res.status(403).json({
                            error: 'Forbidden: User does not have the required permission',
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        } catch {
            return res.status(401).json({ error: 'Access denied' });
        }
    };
}
