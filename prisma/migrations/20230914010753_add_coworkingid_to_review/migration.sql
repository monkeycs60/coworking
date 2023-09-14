/*
  Warnings:

  - A unique constraint covering the columns `[userId,coworkingId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Review_userId_placeId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_coworkingId_key" ON "Review"("userId", "coworkingId");
