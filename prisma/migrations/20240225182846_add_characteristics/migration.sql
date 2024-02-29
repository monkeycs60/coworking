/*
  Warnings:

  - You are about to drop the column `address` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `espressoPrice` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `establishmentType` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `facilities` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `coworking_id` on the `OpeningHour` table. All the data in the column will be lost.
  - Added the required column `CharacteristicsId` to the `Coworking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CharacteristicsId` to the `OpeningHour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OpeningHour" DROP CONSTRAINT "OpeningHour_coworking_id_fkey";

-- DropIndex
DROP INDEX "Coworking_placeId_key";

-- AlterTable
ALTER TABLE "Coworking" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "description",
DROP COLUMN "espressoPrice",
DROP COLUMN "establishmentType",
DROP COLUMN "facilities",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
DROP COLUMN "placeId",
DROP COLUMN "website",
ADD COLUMN     "CharacteristicsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OpeningHour" DROP COLUMN "coworking_id",
ADD COLUMN     "CharacteristicsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "characteristics" (
    "id" TEXT NOT NULL,
    "coworkingId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "website" TEXT,
    "description" TEXT NOT NULL,
    "establishmentType" "EstablishmentType" NOT NULL,
    "espressoPrice" TEXT,
    "facilities" "FacilityType"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "characteristics_coworkingId_key" ON "characteristics"("coworkingId");

-- CreateIndex
CREATE UNIQUE INDEX "characteristics_placeId_key" ON "characteristics"("placeId");

-- AddForeignKey
ALTER TABLE "characteristics" ADD CONSTRAINT "characteristics_coworkingId_fkey" FOREIGN KEY ("coworkingId") REFERENCES "Coworking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningHour" ADD CONSTRAINT "OpeningHour_CharacteristicsId_fkey" FOREIGN KEY ("CharacteristicsId") REFERENCES "characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
