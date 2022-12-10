/*
  Warnings:

  - You are about to drop the column `repo_key` on the `list` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[owner,repo]` on the table `list` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner` to the `list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repo` to the `list` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "list_repo_key_key";

-- AlterTable
ALTER TABLE "list" DROP COLUMN "repo_key";
ALTER TABLE "list" ADD COLUMN     "owner" STRING NOT NULL;
ALTER TABLE "list" ADD COLUMN     "repo" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "list_owner_repo_key" ON "list"("owner", "repo");
