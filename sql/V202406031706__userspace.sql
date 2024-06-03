CREATE OR REPLACE VIEW user_space AS
SELECT 
    user.username AS username,
    space.space_name AS space_name,
    role.role_name AS role
FROM 
    user
JOIN 
    user_space_role ON user.user_id = user_space_role.user_id
JOIN 
    space ON user_space_role.space_id = space.space_id
JOIN 
    role ON user_space_role.role_id = role.role_id;
