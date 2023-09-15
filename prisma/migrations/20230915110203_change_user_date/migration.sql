/*
  Warnings:

  - The `lastSignInAt` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdAt` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastSignInAt",
ADD COLUMN     "lastSignInAt" TIMESTAMP(3),
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3);
