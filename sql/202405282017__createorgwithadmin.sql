CREATE OR REPLACE PROCEDURE create_organization_and_admin(
    IN p_sub VARCHAR(2048),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INTEGER;
BEGIN
    SELECT "user_id" INTO v_user_id
    FROM "user"
    WHERE "sub" = p_sub;

    INSERT INTO organization (organization_name, organization_created)
    VALUES (p_organization_name, NOW());
    
    INSERT INTO organization_admin ("user_id", "organization_id")
    SELECT v_user_id, organization_id 
    FROM organization 
    WHERE organization_name = p_organization_name;
END $$;
