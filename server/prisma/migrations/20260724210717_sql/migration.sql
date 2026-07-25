/*
  Warnings:

  - You are about to drop the `Attempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_climbId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_attemptId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_attemptId_fkey";

-- DropTable
DROP TABLE "Attempt";

-- DropTable
DROP TABLE "Video";

-- CreateTable
CREATE TABLE "attempts" (
    "id" SERIAL NOT NULL,
    "climbId" INTEGER NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "send" BOOLEAN NOT NULL DEFAULT false,
    "fallReason" TEXT,
    "notes" TEXT,

    CONSTRAINT "attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "attemptId" INTEGER NOT NULL,
    "public_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "videos_attemptId_key" ON "videos"("attemptId");

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_climbId_fkey" FOREIGN KEY ("climbId") REFERENCES "climbs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "videos"("attemptId") ON DELETE RESTRICT ON UPDATE CASCADE;
