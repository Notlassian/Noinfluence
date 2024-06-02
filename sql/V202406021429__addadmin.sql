CREATE OR REPLACE PROCEDURE add_organization_admin (
    IN p_username VARCHAR(128),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    DECLARE
        v_user_id INTEGER;
        v_organization_id INTEGER;
    BEGIN
        SELECT user_id INTO v_user_id
        FROM "user"
        WHERE username = p_username;
        
        SELECT organization_id INTO v_organization_id
        FROM organization
        WHERE organization_name = p_organization_name;
        
        IF v_user_id IS NULL THEN
            RAISE EXCEPTION 'User not found';
        END IF;
        
        IF v_organization_id IS NULL THEN
            RAISE EXCEPTION 'Organization not found';
        END IF;

        INSERT INTO organization_admin (user_id, organization_id)
        VALUES (v_user_id, v_organization_id);
    END;
END;
$$;
