CREATE OR REPLACE PROCEDURE create_organization_and_admin(
    IN p_sub VARCHAR(2048),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INTEGER;
    v_organization_id INTEGER;
BEGIN
    IF EXISTS (
        SELECT 1
        FROM organization
        WHERE organization_name = p_organization_name
    ) THEN
        RAISE EXCEPTION 'Organization name already exists';
    ELSE
        SELECT "user_id" INTO v_user_id
        FROM "user"
        WHERE "sub" = p_sub;

        INSERT INTO organization (organization_name, organization_created_at)
        VALUES (p_organization_name, NOW())
        RETURNING organization_id INTO v_organization_id;
        
        INSERT INTO organization_admin ("user_id", "organization_id")
        VALUES (v_user_id, v_organization_id);
    END IF;
END $$;
