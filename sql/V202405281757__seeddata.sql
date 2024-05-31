INSERT INTO issue_progress (issue_progress_name)
VALUES ('In Progress'), ('Branch Testing'), ('Closed'), ('Ready');

INSERT INTO permission (permission_name)
VALUES ('View'), ('Create'), ('Edit'), ('Delete');

INSERT INTO role (role_name)
VALUES ('Viewer'), ('Editor'), ('Administrator');

INSERT INTO role_permission (role_id, permission_id)
SELECT role.role_id, permission.permission_id
FROM role, permission
WHERE role.role_name = 'Viewer'
AND permission.permission_name IN ('View');

INSERT INTO role_permission (role_id, permission_id)
SELECT role.role_id, permission.permission_id
FROM role, permission
WHERE role.role_name = 'Editor'
AND permission.permission_name IN ('View', 'Edit');

INSERT INTO role_permission (role_id, permission_id)
SELECT role.role_id, permission.permission_id
FROM role, permission
WHERE role.role_name = 'Administrator'
AND permission.permission_name IN ('View', 'Create', 'Edit', 'Delete');

