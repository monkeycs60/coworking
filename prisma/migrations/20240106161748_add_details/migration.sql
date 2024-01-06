-- CreateEnum
CREATE TYPE "MusicLevel" AS ENUM ('NoMusic', 'DiscreteMusic', 'RandomMusic', 'LoudMusic');

-- CreateEnum
CREATE TYPE "InternetQuality" AS ENUM ('HighWifi', 'MediumWifi', 'LowWifi', 'NoWifi');

-- CreateEnum
CREATE TYPE "WorkComfort" AS ENUM ('SoloDesk', 'SmallGroupDesk', 'LargeGroupDesk');

-- CreateEnum
CREATE TYPE "WorkspaceComposition" AS ENUM ('PrivateBooths', 'LargeTables');

-- CreateEnum
CREATE TYPE "HasToCall" AS ENUM ('CallFriendly', 'CallImpossible');

-- CreateEnum
CREATE TYPE "DrinksAndFood" AS ENUM ('Snacks', 'Meals', 'SoftDrinks', 'AlcoholicDrinks');

-- AlterTable
ALTER TABLE "Coworking" ADD COLUMN     "drinksAndFoods" "DrinksAndFood"[],
ADD COLUMN     "hasToCalls" "HasToCall"[],
ADD COLUMN     "internetQuality" "InternetQuality"[],
ADD COLUMN     "musicLevel" "MusicLevel"[],
ADD COLUMN     "workComforts" "WorkComfort"[],
ADD COLUMN     "workspaceCompositions" "WorkspaceComposition"[];
