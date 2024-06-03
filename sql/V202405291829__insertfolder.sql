CREATE OR REPLACE PROCEDURE insert_folder(
    IN p_folder_name VARCHAR(50),
    IN p_space_name VARCHAR(50),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_space_id INT;
    v_organization_id INT;
BEGIN
    SELECT organization_id INTO v_organization_id
    FROM organization
    WHERE organization_name = p_organization_name;

    SELECT space_id INTO v_space_id
    FROM space
    WHERE space_name = p_space_name
    AND organization_id = v_organization_id;

    IF NOT EXISTS (
        SELECT 1
        FROM folder
        WHERE folder_name = p_folder_name
        AND space_id = v_space_id
    ) THEN
        INSERT INTO folder (folder_name, folder_created_at, space_id)
        VALUES (p_folder_name, CURRENT_TIMESTAMP, v_space_id);
    END IF;
END;
$$;
