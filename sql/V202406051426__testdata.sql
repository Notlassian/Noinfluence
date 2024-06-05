INSERT INTO "user" ("username")
VALUES ('SudoSueMe'),
       ('SpanishInquisition'),
       ('404BrainNotFound');

CALL create_organization_and_admin ('SudoSueMe', 'NexuTech Innovations');
CALL create_organization_and_admin ('SpanishInquisition', 'TerraCircuit Solutions');
CALL create_organization_and_admin ('404BrainNotFound', 'DataSphere Dynamics');

CALL insert_space ('SudoSueMe', 'Sales', 'NexuTech Innovations');
CALL insert_space ('SudoSueMe', 'Marketing', 'NexuTech Innovations');
CALL insert_space ('SpanishInquisition', 'Development', 'TerraCircuit Solutions');
CALL insert_space ('404BrainNotFound', 'Support', 'DataSphere Dynamics');

Call insert_folder ('Proposals', 'Sales', 'NexuTech Innovations');
Call insert_folder ('Reports', 'Marketing', 'NexuTech Innovations');
Call insert_folder ('Designs', 'Development', 'TerraCircuit Solutions');
Call insert_folder ('Bugs', 'Support', 'DataSphere Dynamics');

Call insert_page ('Apex Dynamics Ltd', 'Proposals', 'Sales', 'NexuTech Innovations');
Call insert_page ('Q2 2024', 'Reports', 'Marketing', 'NexuTech Innovations');
Call insert_page ('QuantumLink Design', 'Designs', 'Development', 'TerraCircuit Solutions');
Call insert_page ('Analytics Bug Report', 'Bugs', 'Support', 'DataSphere Dynamics');

Call add_role_to_user_in_space ('404BrainNotFound', 'Viewer', 'Sales', 'NexuTech Innovations');
Call add_role_to_user_in_space ('SpanishInquisition', 'Editor', 'Marketing', 'NexuTech Innovations');
Call add_role_to_user_in_space ('SudoSueMe', 'Editor', 'Development', 'TerraCircuit Solutions');
Call add_role_to_user_in_space ('SudoSueMe', 'Viewer', 'Support', 'DataSphere Dynamics');
Call add_role_to_user_in_space ('404BrainNotFound', 'Administrator', 'Development', 'TerraCircuit Solutions');
