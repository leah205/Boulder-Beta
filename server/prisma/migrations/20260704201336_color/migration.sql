/*
  Warnings:

  - You are about to drop the column `sent` on the `climbs` table. All the data in the column will be lost.
  - Added the required column `color` to the `climbs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attempt" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "climbs" DROP COLUMN "sent",
ADD COLUMN     "color" TEXT NOT NULL;
