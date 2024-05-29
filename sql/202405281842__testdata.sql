INSERT INTO organization (organization_name, organization_created_at)
VALUES ('Company A', NOW()),
       ('Company B', NOW() - INTERVAL '1' DAY),
       ('Company C', NOW() - INTERVAL '2' DAY);

INSERT INTO space (space_name, space_created_at, organization_id)
VALUES ('Sales', NOW(), (SELECT organization_id FROM organization WHERE organization_name = 'Company A')),
       ('Marketing', NOW(), (SELECT organization_id FROM organization WHERE organization_name = 'Company A')),
       ('Development', NOW(), (SELECT organization_id FROM organization WHERE organization_name = 'Company B')),
       ('Support', NOW(), (SELECT organization_id FROM organization WHERE organization_name = 'Company C'));

INSERT INTO folder (folder_name, folder_created_at, space_id)
VALUES ('Documents', NOW(), (SELECT space_id FROM space WHERE space_name = 'Sales')),
       ('Reports', NOW(), (SELECT space_id FROM space WHERE space_name = 'Sales')),
       ('Designs', NOW(), (SELECT space_id FROM space WHERE space_name = 'Development')),
       ('Bugs', NOW(), (SELECT space_id FROM space WHERE space_name = 'Support'));

INSERT INTO page (page_name, page_created_at, file_path, folder_id)
VALUES ('Document 1', NOW(), '/documents/doc1.pdf', (SELECT folder_id FROM folder WHERE folder_name = 'Documents')),
       ('Report 1', NOW(), '/reports/report1.pdf', (SELECT folder_id FROM folder WHERE folder_name = 'Reports')),
       ('Design 1', NOW(), '/designs/design1.pdf', (SELECT folder_id FROM folder WHERE folder_name = 'Designs')),
       ('Bug 1', NOW(), '/bugs/bug1.pdf', (SELECT folder_id FROM folder WHERE folder_name = 'Bugs'));

INSERT INTO issue (issue_key, issue_name, issue_description, issue_created_at, page_id, issue_progress_id)
VALUES ('ISSUE-001', 'First Issue', 'This is the first issue', NOW(), (SELECT page_id FROM page WHERE page_name = 'Document 1'), (SELECT issue_progress_id FROM issue_progress WHERE issue_progress_name = 'In Progress')),
       ('ISSUE-002', 'Second Issue', 'This is the second issue', NOW(), (SELECT page_id FROM page WHERE page_name = 'Report 1'), (SELECT issue_progress_id FROM issue_progress WHERE issue_progress_name = 'Resolved')),
       ('ISSUE-003', 'Third Issue', 'This is the third issue', NOW(), (SELECT page_id FROM page WHERE page_name = 'Design 1'), (SELECT issue_progress_id FROM issue_progress WHERE issue_progress_name = 'Closed')),
       ('ISSUE-004', 'Fourth Issue', 'This is the fourth issue', NOW(), (SELECT page_id FROM page WHERE page_name = 'Bug 1'), (SELECT issue_progress_id FROM issue_progress WHERE issue_progress_name = 'In Progress'));

INSERT INTO "user" ("sub", "username")
VALUES ('sub123', 'user1'),
       ('sub456', 'user2'),
       ('sub789', 'user3');

INSERT INTO user_space_role (user_id, space_id, role_id)
VALUES ((SELECT "user_id" FROM "user" WHERE "username" = 'user1'), (SELECT space_id FROM space WHERE space_name = 'Sales'), 1),
       ((SELECT "user_id" FROM "user" WHERE "username" = 'user2'), (SELECT space_id FROM space WHERE space_name = 'Marketing'), 2),
       ((SELECT "user_id" FROM "user" WHERE "username" = 'user3'), (SELECT space_id FROM space WHERE space_name = 'Development'), 3);

INSERT INTO organization_admin (user_id, organization_id)
VALUES ((SELECT "user_id" FROM "user" WHERE "username" = 'user1'), (SELECT organization_id FROM organization WHERE organization_name = 'Company A')),
       ((SELECT "user_id" FROM "user" WHERE "username" = 'user2'), (SELECT organization_id FROM organization WHERE organization_name = 'Company B')),
       ((SELECT "user_id" FROM "user" WHERE "username" = 'user3'), (SELECT organization_id FROM organization WHERE organization_name = 'Company C'))
