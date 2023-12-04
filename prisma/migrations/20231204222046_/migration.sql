/*
  Warnings:

  - You are about to drop the column `weekdayText` on the `OpeningHour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OpeningHour" DROP COLUMN "weekdayText",
ADD COLUMN     "closeTime" TEXT,
ADD COLUMN     "openTime" TEXT;
