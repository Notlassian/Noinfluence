INSERT INTO issue_progress (issue_progress_name)
VALUES ("In Progress"), ("Branch Testing"), ("Closed"), ("Ready");

INSERT INTO permission (permission_name)
VALUES ("Read"), ("Write"), ("Edit"), ("Delete");

INSERT INTO role (role_name)
VALUES ("Viewer"), ("Editor"), ("Administrator");

INSERT INTO role_permission (role_id, permission_id)
SELECT role.role_id, permission.permission_id
FROM role, permission
WHERE role.role_name = 'Viewer';

INSERT INTO role_permission (role_id, permission_id)
SELECT role.role_id, permission.permission_id
FROM role, permission
WHERE role.role_name = 'Editor'
AND permission.permission_name IN ('Read', 'Write', 'Edit');

INSERT INTO role_permission (role_id, permission_id)
SELECT role.role_id, permission.permission_id
FROM role, permission
WHERE role.role_name = 'Administrator'
AND permission.permission_name IN ('Read', 'Write', 'Edit', 'Delete');

