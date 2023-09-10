/*
  Warnings:

  - You are about to drop the column `expressoPrice` on the `Coworking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coworking" DROP COLUMN "expressoPrice",
ADD COLUMN     "espressoPrice" TEXT;
