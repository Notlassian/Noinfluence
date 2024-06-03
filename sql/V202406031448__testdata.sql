INSERT INTO "user" ("username")
VALUES ('user1'),
       ('user2'),
       ('user3');

CALL create_organization_and_admin ('user1', 'Company A');
CALL create_organization_and_admin ('user2', 'Company B');
CALL create_organization_and_admin ('user3', 'Company C');

CALL insert_space ('user1', 'Sales', 'Company A');
CALL insert_space ('user1', 'Marketing', 'Company A');
CALL insert_space ('user2', 'Development', 'Company B');
CALL insert_space ('user3', 'Support', 'Company C');

Call insert_folder ('Documents', 'Sales', 'Company A');
Call insert_folder ('Reports', 'Marketing', 'Company A');
Call insert_folder ('Designs', 'Development', 'Company B');
Call insert_folder ('Bugs', 'Support', 'Company C');

Call insert_page ('Document 1', 'Documents', 'Sales', 'Company A');
Call insert_page ('Report 1', 'Reports', 'Marketing', 'Company A');
Call insert_page ('Design 1', 'Designs', 'Development', 'Company B');
Call insert_page ('Bug 1', 'Bugs', 'Support', 'Company C');

Call add_role_to_user_in_space ('user3', 'Viewer', 'Sales', 'Company A');
Call add_role_to_user_in_space ('user2', 'Editor', 'Marketing', 'Company A');
Call add_role_to_user_in_space ('user1', 'Editor', 'Development', 'Company B');
Call add_role_to_user_in_space ('user1', 'Viewer', 'Support', 'Company C');
Call add_role_to_user_in_space ('user3', 'Administrator', 'Development', 'Company B');
