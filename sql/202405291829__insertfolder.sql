CREATE OR REPLACE PROCEDURE insert_folder(
    IN p_folder_name VARCHAR(50),
    IN p_space_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_space_id INT;
BEGIN
    SELECT space_id INTO v_space_id
    FROM space
    WHERE space_name = p_space_name;

    IF EXISTS (
        SELECT 1
        FROM folder
        WHERE folder_name = p_folder_name
        AND space_id = v_space_id
    ) THEN
        RAISE EXCEPTION 'Folder name already exists for this space';
    ELSE
        INSERT INTO folder (folder_name, folder_created_at, space_id)
        VALUES (p_folder_name, CURRENT_TIMESTAMP, v_space_id);
    END IF;
END;
$$;
