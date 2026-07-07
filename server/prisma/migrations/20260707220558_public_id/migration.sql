/*
  Warnings:

  - You are about to drop the column `clip` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `climbs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "clip",
ADD COLUMN     "public_id" TEXT;

-- AlterTable
ALTER TABLE "climbs" DROP COLUMN "picture",
ADD COLUMN     "public_id" TEXT;
