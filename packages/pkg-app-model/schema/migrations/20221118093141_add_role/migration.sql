/*
  Warnings:

  - The `roles` column on the `app_user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "app_role" AS ENUM ('ADMIN', 'REVIEWER');

-- AlterTable
ALTER TABLE "app_user" DROP COLUMN "roles";
ALTER TABLE "app_user" ADD COLUMN "roles" "app_role"[];
