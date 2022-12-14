-- CreateTable
CREATE TABLE "list_follower" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "list_id" INT8 NOT NULL,
    "user_id" INT8 NOT NULL,
    "followed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "list_follower_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "list_follower_list_id_user_id_key" ON "list_follower"("list_id", "user_id");

-- AddForeignKey
ALTER TABLE "list_follower" ADD CONSTRAINT "list_follower_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_follower" ADD CONSTRAINT "list_follower_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
