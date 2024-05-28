CREATE OR REPLACE VIEW user_space_permissions AS
SELECT "user".username AS username,
       space.space AS space,
       role.role AS role,
       permission.permission AS permission
FROM "user"
JOIN user_space_role ON "user".user_id = user_space_role.user_id
JOIN space ON user_space_role.space_id = space.space_id
JOIN role ON user_space_role.role_id = role.role_id
JOIN role_permission ON role.role_id = role_permission.role_id
JOIN permission ON role_permission.permission_id = permission.permission_id;