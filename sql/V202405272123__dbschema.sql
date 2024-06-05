CREATE TABLE "user" (
  "user_id" serial PRIMARY KEY,
  "username" varchar(128) UNIQUE NOT NULL
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
  "organization_name" varchar(30) UNIQUE NOT NULL,
  "organization_created_at" timestamptz NOT NULL
);

CREATE TABLE "role" (
  "role_id" serial PRIMARY KEY,
  "role_name" varchar(30) UNIQUE NOT NULL
);

CREATE TABLE "role_permission" (
  "role_permission_id" serial PRIMARY KEY,
  "role_id" integer NOT NULL,
  "permission_id" integer NOT NULL
);

CREATE TABLE "permission" (
  "permission_id" serial PRIMARY KEY,
  "permission_name" varchar(30) UNIQUE NOT NULL
);

CREATE TABLE "space" (
  "space_id" serial PRIMARY KEY,
  "space_name" varchar(30) NOT NULL,
  "space_created_at" timestamptz NOT NULL,
  "organization_id" integer NOT NULL
);

CREATE TABLE "folder" (
  "folder_id" serial PRIMARY KEY,
  "folder_name" varchar(30) NOT NULL,
  "folder_created_at" timestamptz NOT NULL,
  "space_id" integer NOT NULL
);

CREATE TABLE "page" (
  "page_id" serial PRIMARY KEY,
  "page_name" varchar(30) NOT NULL,
  "page_created_at" timestamptz NOT NULL,
  "folder_id" integer NOT NULL
);
