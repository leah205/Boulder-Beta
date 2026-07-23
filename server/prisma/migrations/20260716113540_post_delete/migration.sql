-- DropForeignKey
ALTER TABLE "betas" DROP CONSTRAINT "betas_postId_fkey";

-- AlterTable
ALTER TABLE "climbs" ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "betas" ADD CONSTRAINT "betas_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
