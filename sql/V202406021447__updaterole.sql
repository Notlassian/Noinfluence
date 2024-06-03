CREATE OR REPLACE PROCEDURE update_user_roles_in_space (
    IN p_username VARCHAR(128),
    IN p_role_name VARCHAR(50),
    IN p_space_name VARCHAR(50),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INTEGER;
    v_role_id INTEGER;
    v_space_id INTEGER;
    v_organization_id INTEGER;
BEGIN
    SELECT user_id INTO v_user_id
    FROM "user"
    WHERE username = p_username;
    
    SELECT role_id INTO v_role_id
    FROM role
    WHERE role_name = p_role_name;
    
    SELECT space_id INTO v_space_id
    FROM space
    WHERE space_name = p_space_name;
    
    SELECT organization_id INTO v_organization_id
    FROM organization
    WHERE organization_name = p_organization_name;
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User not found';
    END IF;
    
    IF v_role_id IS NULL THEN
        RAISE EXCEPTION 'Role not found';
    END IF;
    
    IF v_space_id IS NULL THEN
        RAISE EXCEPTION 'Space not found';
    END IF;
    
    IF v_organization_id IS NULL THEN
        RAISE EXCEPTION 'Organization not found';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM user_space_role
        WHERE space_id = v_space_id
		AND role_id = (SELECT role_id FROM role WHERE role_name = 'Administrator')
		AND NOT user_id = v_user_id
    )
    THEN
        RAISE EXCEPTION 'User is last admin';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM user_space_role
        WHERE user_id = v_user_id AND space_id = v_space_id
    ) THEN
        RAISE EXCEPTION 'User does not have a role in the space';
    END IF;

    UPDATE user_space_role
    SET role_id = v_role_id
    WHERE user_id = v_user_id AND space_id = v_space_id;
END;
$$;
