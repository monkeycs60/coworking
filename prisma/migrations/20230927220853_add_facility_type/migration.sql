-- AlterTable
ALTER TABLE "Coworking" ADD COLUMN     "isCafe" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHotel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLibrary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOtherType" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isThirdSpace" BOOLEAN NOT NULL DEFAULT false;
