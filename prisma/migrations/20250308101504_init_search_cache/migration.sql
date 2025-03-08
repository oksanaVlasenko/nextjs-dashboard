-- CreateTable
CREATE TABLE "SearchCach" (
    "word" TEXT NOT NULL,
    "articles" JSONB,
    "videos" JSONB,
    "songs" JSONB,
    "general" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchCach_pkey" PRIMARY KEY ("word")
);
