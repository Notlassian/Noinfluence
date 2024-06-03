CREATE OR REPLACE PROCEDURE insert_space(
    IN p_username VARCHAR(128),
    IN p_space_name VARCHAR(50),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_organization_id INT;
BEGIN
    SELECT organization_id INTO v_organization_id
    FROM organization
    WHERE organization_name = p_organization_name;

    IF EXISTS (
        SELECT 1
        FROM space
        WHERE space_name = p_space_name
        AND organization_id = v_organization_id
    ) THEN
        RAISE EXCEPTION 'Space name already exists for this organization';
    ELSE
        INSERT INTO space (space_name, space_created_at, organization_id)
        VALUES (p_space_name, CURRENT_TIMESTAMP, v_organization_id);

        CALL add_role_to_user_in_space(p_username, 'Administrator', p_space_name, p_organization_name);
    END IF;
END;
$$;
