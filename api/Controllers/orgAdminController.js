export const getOrgAdmins = async (req, res) => {
    var query =
        'Select username FROM organization_admins_view where org_name=$1';
    var params = [req.params.orgName];
    if (!params[0]) {
        res.status(500).json({ error: 'Internal Server Error' });
    } else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => res.status(200).json(sqlRes.rows))
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
};
