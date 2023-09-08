-- AlterTable
ALTER TABLE "Coworking" ADD COLUMN     "expressoPrice" DOUBLE PRECISION,
ADD COLUMN     "hasExterior" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasParking" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coworkingId" TEXT NOT NULL,
    "calmRating" INTEGER NOT NULL,
    "equipRating" INTEGER NOT NULL,
    "foodRating" INTEGER NOT NULL,
    "feelingRating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_coworkingId_fkey" FOREIGN KEY ("coworkingId") REFERENCES "Coworking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
