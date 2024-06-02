ALTER TABLE "organization_admin" ADD CONSTRAINT "fk_organization_admin_user" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_space_role" ADD CONSTRAINT "fk_user_space_role_user" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_space_role" ADD CONSTRAINT "fk_user_space_role_role" FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");

ALTER TABLE "user_space_role" ADD CONSTRAINT "fk_user_space_role_space" FOREIGN KEY ("space_id") REFERENCES "space" ("space_id");

ALTER TABLE "organization_admin" ADD CONSTRAINT "fk_organization_admin_organization" FOREIGN KEY ("organization_id") REFERENCES "organization" ("organization_id");

ALTER TABLE "space" ADD CONSTRAINT "fk_space_organization" FOREIGN KEY ("organization_id") REFERENCES "organization" ("organization_id");

ALTER TABLE "folder" ADD CONSTRAINT "fk_folder_space" FOREIGN KEY ("space_id") REFERENCES "space" ("space_id");

ALTER TABLE "page" ADD CONSTRAINT "fk_page_folder" FOREIGN KEY ("folder_id") REFERENCES "folder" ("folder_id");

ALTER TABLE "role_permission" ADD CONSTRAINT "fk_role_permission_role" FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");

ALTER TABLE "role_permission" ADD CONSTRAINT "fk_role_permission_permission" FOREIGN KEY ("permission_id") REFERENCES "permission" ("permission_id");


ALTER TABLE "page" ADD CONSTRAINT "unique_page_folder" UNIQUE ("page_name", "folder_id");

ALTER TABLE "folder" ADD CONSTRAINT "unique_folder_space" UNIQUE ("folder_name", "space_id");

ALTER TABLE "space" ADD CONSTRAINT "unique_space_organization" UNIQUE ("space_name", "organization_id");

