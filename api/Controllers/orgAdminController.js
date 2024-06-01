import { HttpStatusCodes } from "../Utils/httpStatusCodes.js";

export const getOrgAdmins = async (req, res) => {
    var query =
        'Select username FROM organization_admins_view where org_name=$1';
    var params = [req.params.orgName];
    if (!params[0]) {
        res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
    } else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                res.status(HttpStatusCodes.OK).json(sqlRes.rows);
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
            });
    }
};
