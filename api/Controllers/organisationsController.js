import { sqlPool } from '../Utils/DbUtils.js';

export const createOrg = async (req, res) => {

    var query = "call create_organization_and_admin($1,$2)";
    var params = [req.user, req.header("Organization")];
    if (!params[0] || !params[1]) res.status(500).json({ error: 'Internal Server Error' });
    else {
        sqlPool.query(query, params)
            .then(() => res.status(200).json({ message: `${params[1]} has been created successfully` }))
            .catch((error) => { console.log(error); res.status(500).json({ error: 'Organization name already exists' }) });
    }

};