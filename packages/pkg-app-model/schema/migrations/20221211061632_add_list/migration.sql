-- CreateEnum
CREATE TYPE "list_status" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "list" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "owner" STRING NOT NULL,
    "repo" STRING NOT NULL,
    "status" "list_status" NOT NULL,
    "description" STRING NOT NULL,
    "star_count" INT8 NOT NULL,
    "tags" STRING[],
    "requested_at" TIMESTAMP(3) NOT NULL,
    "requested_by_id" INT8 NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "approved_by_id" INT8,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "list_owner_repo_key" ON "list"("owner", "repo");

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "app_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_approved_by_id_fkey" FOREIGN KEY ("approved_by_id") REFERENCES "app_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
