-- AlterTable
ALTER TABLE "Coworking" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Coworking" ADD CONSTRAINT "Coworking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
