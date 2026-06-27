/*
  Warnings:

  - You are about to drop the column `attempts` on the `climbs` table. All the data in the column will be lost.
  - You are about to drop the `Clip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_climbId_fkey";

-- AlterTable
ALTER TABLE "climbs" DROP COLUMN "attempts",
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Clip";

-- CreateTable
CREATE TABLE "Attempt" (
    "id" SERIAL NOT NULL,
    "clip" TEXT,
    "climbId" INTEGER NOT NULL,
    "send" BOOLEAN NOT NULL DEFAULT false,
    "fallReason" TEXT,
    "notes" TEXT,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_climbId_fkey" FOREIGN KEY ("climbId") REFERENCES "climbs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
