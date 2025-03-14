-- CreateTable
CREATE TABLE "ArticleOfTheDay" (
    "id" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "ArticleOfTheDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleOfTheDay_date_key" ON "ArticleOfTheDay"("date");
