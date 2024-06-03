INSERT INTO "user" ("username")
VALUES ('user1'),
       ('user2'),
       ('user3');

INSERT INTO organization (organization_name, organization_created_at)
VALUES ('Company A', NOW()),
       ('Company B', NOW() - INTERVAL '1' DAY),
       ('Company C', NOW() - INTERVAL '2' DAY);

-- INSERT INTO space (space_name, space_created_at, organization_id)
-- VALUES ('Sales', NOW(), (SELECT organization_id FROM organization WHERE organization_name = 'Company A')),
--        ('Marketing', NOW(), (SELECT organization_id FROM organization WHERE organization_name = 'Company A')),
--        ('Development', NOW(), (SELECT organization_id FROM organization WHERE organization_name = 'Company B')),
--        ('Support', NOW(), (SELECT organization_id FROM organization WHERE organization_name = 'Company C'));

CALL insert_space('user1', 'Sales', 'Company A');
CALL insert_space('user1', 'Marketing', 'Company A');
CALL insert_space('user2', 'Development', 'Company B');
CALL insert_space('user3', 'Support', 'Company C');

INSERT INTO folder (folder_name, folder_created_at, space_id)
VALUES ('Documents', NOW(), (SELECT space_id FROM space WHERE space_name = 'Sales')),
       ('Reports', NOW(), (SELECT space_id FROM space WHERE space_name = 'Sales')),
       ('Designs', NOW(), (SELECT space_id FROM space WHERE space_name = 'Development')),
       ('Bugs', NOW(), (SELECT space_id FROM space WHERE space_name = 'Support'));

INSERT INTO page (page_name, page_created_at, folder_id)
VALUES ('Document 1', NOW(), (SELECT folder_id FROM folder WHERE folder_name = 'Documents')),
       ('Report 1', NOW(), (SELECT folder_id FROM folder WHERE folder_name = 'Reports')),
       ('Design 1', NOW(), (SELECT folder_id FROM folder WHERE folder_name = 'Designs')),
       ('Bug 1', NOW(), (SELECT folder_id FROM folder WHERE folder_name = 'Bugs'));

INSERT INTO user_space_role (user_id, space_id, role_id)
VALUES ((SELECT "user_id" FROM "user" WHERE "username" = 'user1'), (SELECT space_id FROM space WHERE space_name = 'Sales'), 1),
       ((SELECT "user_id" FROM "user" WHERE "username" = 'user2'), (SELECT space_id FROM space WHERE space_name = 'Marketing'), 2),
       ((SELECT "user_id" FROM "user" WHERE "username" = 'user3'), (SELECT space_id FROM space WHERE space_name = 'Development'), 3);

INSERT INTO organization_admin (user_id, organization_id)
VALUES ((SELECT "user_id" FROM "user" WHERE "username" = 'user1'), (SELECT organization_id FROM organization WHERE organization_name = 'Company A')),
       ((SELECT "user_id" FROM "user" WHERE "username" = 'user2'), (SELECT organization_id FROM organization WHERE organization_name = 'Company B')),
       ((SELECT "user_id" FROM "user" WHERE "username" = 'user3'), (SELECT organization_id FROM organization WHERE organization_name = 'Company C'));

