/*
  Warnings:

  - Added the required column `languageFrom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageTo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "languageFrom" TEXT NOT NULL,
ADD COLUMN     "languageTo" TEXT NOT NULL,
ADD COLUMN     "level" "Level" NOT NULL;

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "progress" INTEGER NOT NULL;
