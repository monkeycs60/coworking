/*
  Warnings:

  - You are about to drop the column `calmRating` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `equipmentRating` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `feelingRating` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `foodAndDrinksRating` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_coworkingId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "Coworking" DROP COLUMN "calmRating",
DROP COLUMN "equipmentRating",
DROP COLUMN "feelingRating",
DROP COLUMN "foodAndDrinksRating";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "content" DROP NOT NULL;

-- DropTable
DROP TABLE "Vote";
