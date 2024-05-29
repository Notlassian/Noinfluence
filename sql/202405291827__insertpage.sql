CREATE OR REPLACE PROCEDURE insert_page(
    IN p_page_name VARCHAR(50),
    IN p_file_path VARCHAR(1024),
    IN p_folder_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_folder_id INT;
BEGIN
    SELECT folder_id INTO v_folder_id
    FROM folder
    WHERE folder_name = p_folder_name;

    IF EXISTS (
        SELECT 1
        FROM page
        WHERE page_name = p_page_name
        AND folder_id = v_folder_id
    ) THEN
        RAISE EXCEPTION 'Page name already exists for this folder';
    ELSE
        INSERT INTO page (page_name, page_created_at, file_path, folder_id)
        VALUES (p_page_name, CURRENT_TIMESTAMP, p_file_path, v_folder_id);
    END IF;
END;
$$;
