
export function hasPermission(requiredPermission){
return function (req, res, next) {
    try{ const myPermissions = req.get("Roles").split(","); //TEMP!!!!!!!!!
    
        if (myPermissions.includes(requiredPermission))
        next();
        else
        return res.status(403).json({ error: 'Forbidden: User does not have the required permission' });}
    catch 
    { return res.status(401).json({ error: 'Access denied' });}
};
}