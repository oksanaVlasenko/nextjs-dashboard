-- CreateTable
CREATE TABLE "WordOfTheDay" (
    "id" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordOfTheDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordOfTheDay_date_key" ON "WordOfTheDay"("date");
