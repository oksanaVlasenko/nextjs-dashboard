/*
  Warnings:

  - You are about to drop the `SearchCach` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SearchCach";

-- CreateTable
CREATE TABLE "SearchCache" (
    "word" TEXT NOT NULL,
    "articles" JSONB,
    "videos" JSONB,
    "songs" JSONB,
    "general" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchCache_pkey" PRIMARY KEY ("word")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchCache_word_key" ON "SearchCache"("word");
