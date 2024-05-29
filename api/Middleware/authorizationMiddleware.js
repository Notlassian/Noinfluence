import { sqlPool } from "../Utils/DbUtils.js";

export function hasPermission(requiredPermission){
return function (req, res, next) {
    try{ 
        const query='SELECT * FROM user_space_permissions where username=$1 AND  space=$2 and Permission=$3;'
        const vals=[req.user||"", req.header("Space")||"", requiredPermission]
        sqlPool.query(query, vals)
        .then(dbRes => {
          if (dbRes.rowCount > 0) {
            next();
          } else {
            res.status(403).json({ error: 'Forbidden: User does not have the required permission' });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    }
    catch 
    { return res.status(401).json({ error: 'Access denied' });}
};
}