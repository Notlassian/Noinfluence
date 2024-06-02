CREATE OR REPLACE PROCEDURE remove_user_roles_in_space (
    IN p_username VARCHAR(128),
    IN p_space_name VARCHAR(50),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INTEGER;
    v_space_id INTEGER;
    v_organization_id INTEGER;
BEGIN
    SELECT user_id INTO v_user_id
    FROM "user"
    WHERE username = p_username;
    
    SELECT space_id INTO v_space_id
    FROM space
    WHERE space_name = p_space_name;
    
    SELECT organization_id INTO v_organization_id
    FROM organization
    WHERE organization_name = p_organization_name;
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User not found';
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
        WHERE user_id = v_user_id AND space_id = v_space_id
    ) THEN
        RAISE EXCEPTION 'User does not have roles in the space';
    END IF;

    DELETE FROM user_space_role
    WHERE user_id = v_user_id AND space_id = v_space_id;
END;
$$;
