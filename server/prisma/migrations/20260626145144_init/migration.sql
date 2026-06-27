/*
  Warnings:

  - You are about to drop the `Clap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Emphasis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clap" DROP CONSTRAINT "Clap_climbId_fkey";

-- DropForeignKey
ALTER TABLE "Clap" DROP CONSTRAINT "Clap_userId_fkey";

-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_climbId_fkey";

-- DropForeignKey
ALTER TABLE "Emphasis" DROP CONSTRAINT "Emphasis_betaId_fkey";

-- DropForeignKey
ALTER TABLE "Emphasis" DROP CONSTRAINT "Emphasis_userId_fkey";

-- DropForeignKey
ALTER TABLE "betas" DROP CONSTRAINT "betas_climbId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_creatorId_fkey";

-- DropTable
DROP TABLE "Clap";

-- DropTable
DROP TABLE "Emphasis";

-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "climbs" (
    "id" SERIAL NOT NULL,
    "caption" TEXT,
    "rating" INTEGER,
    "grade" TEXT,
    "attempts" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "climbs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claps" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "climbId" INTEGER NOT NULL,

    CONSTRAINT "claps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emphases" (
    "id" SERIAL NOT NULL,
    "betaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "emphases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "climbs" ADD CONSTRAINT "climbs_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_climbId_fkey" FOREIGN KEY ("climbId") REFERENCES "climbs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "betas" ADD CONSTRAINT "betas_climbId_fkey" FOREIGN KEY ("climbId") REFERENCES "climbs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claps" ADD CONSTRAINT "claps_climbId_fkey" FOREIGN KEY ("climbId") REFERENCES "climbs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claps" ADD CONSTRAINT "claps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emphases" ADD CONSTRAINT "emphases_betaId_fkey" FOREIGN KEY ("betaId") REFERENCES "betas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emphases" ADD CONSTRAINT "emphases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
