CREATE OR REPLACE VIEW page_details AS
SELECT
    page.page_id,
    page.page_name,
    page.file_path,
    page.page_created_at,
    folder.folder_name AS folder_name,
    space.space_name AS space_name,
    organization.organization_name AS organization_name
FROM
    page
JOIN
    folder ON page.folder_id = folder.folder_id
JOIN
    space ON folder.space_id = space.space_id
JOIN
    organization ON space.organization_id = organization.organization_id;
