/*
  Warnings:

  - A unique constraint covering the columns `[word]` on the table `SearchCach` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SearchCach_word_key" ON "SearchCach"("word");
