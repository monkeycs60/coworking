-- CreateTable
CREATE TABLE "imageSelected" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "coworkingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imageSelected_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imageSelected" ADD CONSTRAINT "imageSelected_coworkingId_fkey" FOREIGN KEY ("coworkingId") REFERENCES "Coworking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
