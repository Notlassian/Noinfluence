CREATE OR REPLACE FUNCTION is_user_admin(
    IN p_organization_name VARCHAR(50),
    IN p_username VARCHAR(128)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INTEGER;
    v_organization_id INTEGER;
    v_is_admin BOOLEAN;
BEGIN
    SELECT user_id INTO v_user_id
    FROM "user"
    WHERE username = p_username;
  
    SELECT organization_id INTO v_organization_id
    FROM organization
    WHERE organization_name = p_organization_name;

    SELECT EXISTS (
        SELECT 1
        FROM organization_admin
        WHERE user_id = v_user_id
        AND organization_id = v_organization_id
    ) INTO v_is_admin;
    
    RETURN v_is_admin;
END;
$$;
