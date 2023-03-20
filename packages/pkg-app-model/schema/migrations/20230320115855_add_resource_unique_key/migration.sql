/*
  Warnings:

  - A unique constraint covering the columns `[resource_id,list_id]` on the table `resource_link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "resource_link_resource_id_list_id_key" ON "resource_link"("resource_id", "list_id");
