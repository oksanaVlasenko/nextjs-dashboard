/*
  Warnings:

  - You are about to drop the column `examples` on the `Word` table. All the data in the column will be lost.
  - Added the required column `example1` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `example2` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "examples",
ADD COLUMN     "example1" TEXT NOT NULL,
ADD COLUMN     "example2" TEXT NOT NULL;
