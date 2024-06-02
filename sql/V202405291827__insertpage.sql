CREATE OR REPLACE PROCEDURE insert_page(
    IN p_page_name VARCHAR(50),
    IN p_file_path VARCHAR(1024),
    IN p_folder_name VARCHAR(50),
    IN p_space_name VARCHAR(50),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_folder_id INT;
    v_page_id INT;
    v_organization_id INT;
    v_space_id INT;
BEGIN
    SELECT organization_id INTO v_organization_id
    FROM organization
    WHERE organization_name = p_organization_name;
    
    SELECT space_id INTO v_space_id
    FROM space
    WHERE space_name = p_space_name
    AND organization_id = v_organization_id;

    SELECT folder_id INTO v_folder_id
    FROM folder
    WHERE folder_name = p_folder_name
    AND space_id = v_space_id;

    IF EXISTS (
        SELECT 1
        FROM page
        WHERE page_name = p_page_name
        AND folder_id = v_folder_id
    ) THEN
        RAISE EXCEPTION 'Page name already exists for this folder';
    ELSE
        INSERT INTO page (page_name, page_created_at, file_path, folder_id)
        VALUES (p_page_name, CURRENT_TIMESTAMP, p_file_path, v_folder_id)
        RETURNING page_id INTO v_page_id;
    END IF;
END;
$$;
