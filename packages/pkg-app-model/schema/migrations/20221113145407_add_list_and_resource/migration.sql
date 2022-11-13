-- CreateEnum
CREATE TYPE "resource_type" AS ENUM ('CODE', 'VIDEO', 'WEBSITE');

-- CreateTable
CREATE TABLE "list" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "repo_key" STRING NOT NULL,
    "description" STRING NOT NULL,
    "star_count" INT8 NOT NULL,
    "tags" STRING[],
    "requested_at" TIMESTAMP(3) NOT NULL,
    "requested_by_id" INT8 NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "approved_by_id" INT8,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "url" STRING NOT NULL,
    "domain" STRING NOT NULL,
    "type" "resource_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "list_id" INT8 NOT NULL,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "list_repo_key_key" ON "list"("repo_key");

-- CreateIndex
CREATE UNIQUE INDEX "resource_url_key" ON "resource"("url");

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "app_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_approved_by_id_fkey" FOREIGN KEY ("approved_by_id") REFERENCES "app_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
