CREATE OR REPLACE VIEW user_space_organization_permissions AS
SELECT 
    "user".user_id AS user_id,
    "user".username AS username,
    space.space_id AS space_id,
    space.space_name AS space_name,
    organization.organization_id AS organization_id,
    organization.organization_name AS organization_name,
    role.role_name AS role,
    permission.permission_name AS permission_name
FROM 
    "user"
JOIN 
    user_space_role ON "user".user_id = user_space_role.user_id
JOIN 
    space ON user_space_role.space_id = space.space_id
JOIN 
    organization ON space.organization_id = organization.organization_id
JOIN 
    role ON user_space_role.role_id = role.role_id
JOIN 
    role_permission ON role.role_id = role_permission.role_id
JOIN 
    permission ON role_permission.permission_id = permission.permission_id;
