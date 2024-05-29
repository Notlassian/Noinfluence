CREATE OR REPLACE PROCEDURE insert_issue(
    IN p_issue_name VARCHAR(50),
    IN p_issue_key VARCHAR(10),
	IN p_page_name VARCHAR(50),
    IN p_issue_description VARCHAR(500) DEFAULT ''
    
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_page_id INT;
    v_progress_id INT;
BEGIN
    SELECT page_id INTO v_page_id
    FROM page
    WHERE page_name = p_page_name;

    IF EXISTS (
        SELECT 1
        FROM issue
        WHERE issue_name = p_issue_name
        AND page_id = v_page_id
    ) THEN
        RAISE EXCEPTION 'Issue name already exists for this page';
    ELSE
        SELECT issue_progress_id INTO v_progress_id
        FROM issue_progress
        WHERE issue_progress_name = 'Ready';

        INSERT INTO issue (issue_key, issue_name, issue_description, issue_created_at, page_id, issue_progress_id)
        VALUES (p_issue_key, p_issue_name, p_issue_description, CURRENT_TIMESTAMP, v_page_id, v_progress_id);
    END IF;
END;
$$;
