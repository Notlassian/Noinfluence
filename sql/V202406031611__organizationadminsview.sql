CREATE OR REPLACE VIEW organization_admins_view AS
SELECT username, organization_name
FROM "user" 
    INNER JOIN organization_admin ON "user".user_id = organization_admin.user_id
    INNER JOIN organization ON organization.organization_id = organization_admin.organization_id