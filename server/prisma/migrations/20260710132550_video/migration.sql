/*
  Warnings:

  - You are about to drop the column `public_id` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `climbId` on the `betas` table. All the data in the column will be lost.
  - You are about to drop the column `climbId` on the `claps` table. All the data in the column will be lost.
  - Added the required column `videoId` to the `betas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `claps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "betas" DROP CONSTRAINT "betas_climbId_fkey";

-- DropForeignKey
ALTER TABLE "claps" DROP CONSTRAINT "claps_climbId_fkey";

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "public_id";

-- AlterTable
ALTER TABLE "betas" DROP COLUMN "climbId",
ADD COLUMN     "videoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "claps" DROP COLUMN "climbId",
ADD COLUMN     "videoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "attemptId" INTEGER NOT NULL,
    "public_id" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_attemptId_key" ON "Video"("attemptId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "betas" ADD CONSTRAINT "betas_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claps" ADD CONSTRAINT "claps_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
