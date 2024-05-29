CREATE TABLE "user" (
  "user_id" serial PRIMARY KEY,
  "sub" varchar(2048) UNIQUE NOT NULL,
  "username" varchar(50) NOT NULL
);

CREATE TABLE "user_space_role" (
  "user_space_role_id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "space_id" integer NOT NULL,
  "role_id" integer NOT NULL
);

CREATE TABLE "organization_admin" (
  "organization_admin_id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "organization_id" integer NOT NULL
);

CREATE TABLE "organization" (
  "organization_id" serial PRIMARY KEY,
  "organization_name" varchar(50) UNIQUE NOT NULL,
  "organization_created_at" timestamptz NOT NULL
);

CREATE TABLE "role" (
  "role_id" serial PRIMARY KEY,
  "role_name" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "role_permission" (
  "role_permission_id" serial PRIMARY KEY,
  "role_id" integer NOT NULL,
  "permission_id" integer NOT NULL
);

CREATE TABLE "permission" (
  "permission_id" serial PRIMARY KEY,
  "permission_name" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "space" (
  "space_id" serial PRIMARY KEY,
  "space_name" varchar(50) NOT NULL,
  "space_created_at" timestamptz NOT NULL,
  "organization_id" integer NOT NULL
);

CREATE TABLE "folder" (
  "folder_id" serial PRIMARY KEY,
  "folder_name" varchar(50) NOT NULL,
  "folder_created_at" timestamptz NOT NULL,
  "space_id" integer NOT NULL
);

CREATE TABLE "page" (
  "page_id" serial PRIMARY KEY,
  "page_name" varchar(50) NOT NULL,
  "page_created_at" timestamptz NOT NULL,
  "file_path" varchar(1024),
  "folder_id" integer NOT NULL
);

CREATE TABLE "issue" (
  "issue_id" serial PRIMARY KEY,
  "issue_key" varchar(10) NOT NULL,
  "issue_name" varchar(50) NOT NULL,
  "issue_description" varchar(500) NOT NULL,
  "issue_created_at" timestamptz NOT NULL,
  "page_id" integer NOT NULL,
  "issue_progress_id" integer NOT NULL
);

CREATE TABLE "issue_progress" (
  "issue_progress_id" serial PRIMARY KEY,
  "issue_progress_name" varchar(50) UNIQUE NOT NULL
);
