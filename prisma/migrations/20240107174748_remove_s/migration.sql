/*
  Warnings:

  - You are about to drop the column `drinksAndFoods` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `hasToCalls` on the `Coworking` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceCompositions` on the `Coworking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coworking" DROP COLUMN "drinksAndFoods",
DROP COLUMN "hasToCalls",
DROP COLUMN "workspaceCompositions",
ADD COLUMN     "drinksAndFood" "DrinksAndFood"[],
ADD COLUMN     "hasToCall" "HasToCall"[],
ADD COLUMN     "workspaceComposition" "WorkspaceComposition"[];
