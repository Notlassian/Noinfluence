

CREATE TABLE "user" (
  "user_id" serial PRIMARY KEY,
  "uid" char(23),
  "username" varchar(30)
);

CREATE TABLE "user_space_role" (
  "user_space_role_id" serial PRIMARY KEY,
  "user_id" integer,
  "space_id" integer,
  "role_id" integer
);

CREATE TABLE "org_admin" (
  "org_admin_id" serial PRIMARY KEY,
  "user_id" integer,
  "org_id" integer
);

CREATE TABLE "organization" (
  "org_id" serial PRIMARY KEY,
  "org_name" varchar(50) UNIQUE
);

CREATE TABLE "role" (
  "role_id" serial PRIMARY KEY,
  "role_name" varchar(25)
);

CREATE TABLE "role_permission" (
  "role_perm_id" serial PRIMARY KEY,
  "role_id" integer,
  "perm_id" integer
);

CREATE TABLE "permission" (
  "perm_id" serial PRIMARY KEY,
  "perm_name" varchar(25)
);

CREATE TABLE "space" (
  "space_id" serial PRIMARY KEY,
  "space_name" varchar(50),
  "org_id" integer
);

CREATE TABLE "folder" (
  "folder_id" serial PRIMARY KEY,
  "folder_name" varchar(25),
  "space_id" integer
);

CREATE TABLE "page" (
  "page_id" serial PRIMARY KEY,
  "page_name" varchar(25),
  "folder_id" integer
);

CREATE TABLE "issue" (
  "issue_id" serial PRIMARY KEY,
  "issue_key" varchar(10),
  "issue_name" varchar(30),
  "issue_desc" varchar(100),
  "page_id" integer,
  "issue_progress_id" integer
);

CREATE TABLE "issue_progress" (
  "issue_progress_id" serial PRIMARY KEY,
  "issue_progress_name" varchar(15)
);

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
