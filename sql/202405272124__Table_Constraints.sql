ALTER TABLE "issue" ADD FOREIGN KEY ("issue_progress_id") REFERENCES "issue_progress" ("issue_progress_id");

ALTER TABLE "issue" ADD FOREIGN KEY ("page_id") REFERENCES "page" ("page_id");

ALTER TABLE "org_admin" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_space_role" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_space_role" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");

ALTER TABLE "user_space_role" ADD FOREIGN KEY ("space_id") REFERENCES "space" ("space_id");

ALTER TABLE "org_admin" ADD FOREIGN KEY ("org_id") REFERENCES "organization" ("org_id");

ALTER TABLE "space" ADD FOREIGN KEY ("org_id") REFERENCES "organization" ("org_id");

ALTER TABLE "folder" ADD FOREIGN KEY ("space_id") REFERENCES "space" ("space_id");

ALTER TABLE "page" ADD FOREIGN KEY ("folder_id") REFERENCES "folder" ("folder_id");

ALTER TABLE "role_permission" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");

ALTER TABLE "role_permission" ADD FOREIGN KEY ("perm_id") REFERENCES "permission" ("perm_id");


ALTER TABLE "page" ADD CONSTRAINT unique_page_folder UNIQUE ("page_name", "folder_id");

ALTER TABLE "folder" ADD CONSTRAINT unique_folder_space UNIQUE ("folder_name", "space_id");

ALTER TABLE "space" ADD CONSTRAINT unique_space_organization UNIQUE ("space_name", "org_id");