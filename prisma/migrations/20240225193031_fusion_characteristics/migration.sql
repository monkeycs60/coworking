/*
  Warnings:

  - You are about to drop the column `CharacteristicsId` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the `characteristics` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[placeId]` on the table `Coworking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Coworking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Coworking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establishmentType` to the `Coworking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Coworking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Coworking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Coworking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `Coworking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coworkingId` to the `OpeningHour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OpeningHour" DROP CONSTRAINT "OpeningHour_CharacteristicsId_fkey";

-- DropForeignKey
ALTER TABLE "characteristics" DROP CONSTRAINT "characteristics_coworkingId_fkey";

-- AlterTable
ALTER TABLE "Coworking" DROP COLUMN "CharacteristicsId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "espressoPrice" TEXT,
ADD COLUMN     "establishmentType" "EstablishmentType" NOT NULL,
ADD COLUMN     "facilities" "FacilityType"[],
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "placeId" TEXT NOT NULL,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "OpeningHour" ADD COLUMN     "coworkingId" TEXT NOT NULL;

-- DropTable
DROP TABLE "characteristics";

-- CreateIndex
CREATE UNIQUE INDEX "Coworking_placeId_key" ON "Coworking"("placeId");

-- AddForeignKey
ALTER TABLE "OpeningHour" ADD CONSTRAINT "OpeningHour_coworkingId_fkey" FOREIGN KEY ("coworkingId") REFERENCES "Coworking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
