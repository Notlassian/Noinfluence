CREATE VIEW organization_admin_view AS
SELECT organization_admin_id, username, organization_name
FROM "user" 
INNER JOIN "organization_admin" ON "user".user_id = "organization_admin".user_id
INNER JOIN "organization" ON "organization_admin".organization_id = "organization".organization_id