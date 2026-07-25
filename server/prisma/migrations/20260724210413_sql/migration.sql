/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_attemptId_fkey";

-- DropForeignKey
ALTER TABLE "betas" DROP CONSTRAINT "betas_postId_fkey";

-- DropForeignKey
ALTER TABLE "claps" DROP CONSTRAINT "claps_postId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "attemptId" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_attemptId_key" ON "posts"("attemptId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Video"("attemptId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "betas" ADD CONSTRAINT "betas_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claps" ADD CONSTRAINT "claps_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
