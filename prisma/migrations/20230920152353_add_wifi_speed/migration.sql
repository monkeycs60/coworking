-- AlterTable
ALTER TABLE "Coworking" ADD COLUMN     "highWifi" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lowWifi" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mediumWifi" BOOLEAN NOT NULL DEFAULT false;
