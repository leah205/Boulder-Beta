/*
  Warnings:

  - You are about to drop the column `published` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `attemptId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[videoId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `videoId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_attemptId_fkey";

-- DropIndex
DROP INDEX "Post_attemptId_key";

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "published";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "attemptId",
ADD COLUMN     "videoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Post_videoId_key" ON "Post"("videoId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
