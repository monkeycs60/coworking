/*
  Warnings:

  - You are about to drop the column `type` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `coworkingId` on table `Vote` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_coworking_id_fkey";

-- AlterTable
ALTER TABLE "Coworking" ADD COLUMN     "imageUrls" TEXT[];

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "type",
ADD COLUMN     "calmRating" INTEGER,
ADD COLUMN     "equipRating" INTEGER,
ADD COLUMN     "foodRating" INTEGER,
ALTER COLUMN "coworkingId" SET NOT NULL;

-- DropTable
DROP TABLE "Photo";

-- DropEnum
DROP TYPE "VoteType";
