/*
  Warnings:

  - You are about to drop the column `discreteMusic` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `highWifi` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `isCafe` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `isHotel` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `isLibrary` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `isOtherType` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `isThirdSpace` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `loudMusic` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `lowWifi` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `mediumWifi` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `noMusic` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `randomMusic` on the `Coworking` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FacilityType" AS ENUM ('IS_CAFE', 'IS_HOTEL', 'IS_LIBRARY', 'IS_THIRD_SPACE', 'IS_OTHER_TYPE');

-- CreateEnum
CREATE TYPE "WifiQualityType" AS ENUM ('HIGH_WIFI', 'MEDIUM_WIFI', 'LOW_WIFI');

-- CreateEnum
CREATE TYPE "MusicType" AS ENUM ('NO_MUSIC', 'DISCRETE_MUSIC', 'RANDOM_MUSIC', 'LOUD_MUSIC');

-- AlterTable
ALTER TABLE "Coworking" DROP COLUMN "discreteMusic",
DROP COLUMN "highWifi",
DROP COLUMN "isCafe",
DROP COLUMN "isHotel",
DROP COLUMN "isLibrary",
DROP COLUMN "isOtherType",
DROP COLUMN "isThirdSpace",
DROP COLUMN "loudMusic",
DROP COLUMN "lowWifi",
DROP COLUMN "mediumWifi",
DROP COLUMN "noMusic",
DROP COLUMN "randomMusic",
ADD COLUMN     "facility" "FacilityType",
ADD COLUMN     "music" "MusicType",
ADD COLUMN     "wifiQuality" "WifiQualityType";
