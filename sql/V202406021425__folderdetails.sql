CREATE OR REPLACE VIEW folder_details AS
SELECT
    folder.folder_id,
    folder.folder_name,
    folder.folder_created_at,
    space.space_name AS space_name,
    organization.organization_name AS organization_name
FROM
    folder
JOIN
    space ON folder.space_id = space.space_id
JOIN
    organization ON space.organization_id = organization.organization_id;
