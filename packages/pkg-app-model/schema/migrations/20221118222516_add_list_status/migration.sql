/*
  Warnings:

  - Added the required column `status` to the `list` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "list_status" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "list" ADD COLUMN "status" "list_status" NOT NULL;
