-- CreateEnum
CREATE TYPE "resource_type" AS ENUM ('CODE', 'VIDEO', 'WEBSITE');

-- CreateTable
CREATE TABLE "resource" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "url" STRING NOT NULL,
    "domain" STRING NOT NULL,
    "type" "resource_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_link" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "description" STRING NOT NULL,
    "tags" STRING[],
    "resource_id" INT8 NOT NULL,
    "list_id" INT8 NOT NULL,

    CONSTRAINT "resource_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resource_url_key" ON "resource"("url");

-- AddForeignKey
ALTER TABLE "resource_link" ADD CONSTRAINT "resource_link_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_link" ADD CONSTRAINT "resource_link_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
