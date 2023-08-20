/*
  Warnings:

  - A unique constraint covering the columns `[placeId]` on the table `Coworking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Coworking" ADD COLUMN     "placeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Coworking_placeId_key" ON "Coworking"("placeId");
