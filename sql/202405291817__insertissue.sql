CREATE OR REPLACE PROCEDURE insert_issue(
    IN p_issue_name VARCHAR(50),
    IN p_issue_key VARCHAR(10),
    IN p_page_name VARCHAR(50),
    IN p_issue_description VARCHAR(500) DEFAULT '',
    IN p_space_name VARCHAR(50),
    IN p_organization_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_page_id INT;
    v_progress_id INT;
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

    IF EXISTS (
        SELECT 1
        FROM issue
        INNER JOIN page ON issue.page_id = page.page_id
        INNER JOIN folder ON page.folder_id = folder.folder_id
        INNER JOIN space ON folder.space_id = space.space_id
        WHERE issue.issue_name = p_issue_name
        AND space.space_id = v_space_id
    ) THEN
        RAISE EXCEPTION 'Issue name already exists for this space';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM issue
        INNER JOIN page ON issue.page_id = page.page_id
        INNER JOIN folder ON page.folder_id = folder.folder_id
        INNER JOIN space ON folder.space_id = space.space_id
        WHERE issue.issue_key = p_issue_key
        AND space.space_id = v_space_id
    ) THEN
        RAISE EXCEPTION 'Issue key already exists for this space';
    END IF;

    SELECT page_id INTO v_page_id
    FROM page
    WHERE page_name = p_page_name;

    SELECT issue_progress_id INTO v_progress_id
    FROM issue_progress
    WHERE issue_progress_name = 'Ready';

    INSERT INTO issue (issue_key, issue_name, issue_description, issue_created_at, page_id, issue_progress_id)
    VALUES (p_issue_key, p_issue_name, p_issue_description, CURRENT_TIMESTAMP, v_page_id, v_progress_id);
END;
$$;
