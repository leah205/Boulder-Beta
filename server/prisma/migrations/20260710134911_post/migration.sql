/*
  Warnings:

  - You are about to drop the column `videoId` on the `betas` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `claps` table. All the data in the column will be lost.
  - Added the required column `postId` to the `betas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `claps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "betas" DROP CONSTRAINT "betas_videoId_fkey";

-- DropForeignKey
ALTER TABLE "claps" DROP CONSTRAINT "claps_videoId_fkey";

-- AlterTable
ALTER TABLE "betas" DROP COLUMN "videoId",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "claps" DROP COLUMN "videoId",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "attemptId" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_attemptId_key" ON "Post"("attemptId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "betas" ADD CONSTRAINT "betas_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claps" ADD CONSTRAINT "claps_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
