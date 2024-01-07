/*
  Warnings:

  - You are about to drop the column `workComforts` on the `Coworking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coworking" DROP COLUMN "workComforts",
ADD COLUMN     "workComfort" "WorkComfort"[];
