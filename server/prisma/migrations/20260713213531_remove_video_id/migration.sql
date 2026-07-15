/*
  Warnings:

  - You are about to drop the column `videoId` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Video` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attemptId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attemptId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_videoId_fkey";

-- DropIndex
DROP INDEX "Post_videoId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "videoId",
ADD COLUMN     "attemptId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Post_attemptId_key" ON "Post"("attemptId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Video"("attemptId") ON DELETE RESTRICT ON UPDATE CASCADE;
