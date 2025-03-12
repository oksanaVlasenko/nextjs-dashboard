'use server';

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Word } from "@prisma/client";
import { TranslationOption } from "@/app/lib/definitions";

const ITEMS_PER_PAGE = 5;

export async function getWordsTotalPages(query:string) {
  const session = await auth();
  const userId = session?.user?.id ?? '';

  const totalWords = await prisma.word.count({
    where: {
      userId,
      word: {
        contains: query, 
        mode: "insensitive", 
      }
    }
  });

  const totalPages = Math.ceil(totalWords / ITEMS_PER_PAGE);

  return totalPages
}

export async function getUserWords({
  page = 1,
  search = ""
}: {
  page?: number;
  search?: string;
}) {
  const session = await auth();
  const userId = session?.user?.id ?? '';

  try {

    const totalWords = await prisma.word.count({
      where: {
        userId,
        word: {
          contains: search, 
          mode: "insensitive", 
        }
      }
    });
  
    const totalPages = Math.ceil(totalWords / ITEMS_PER_PAGE);

    const words = await prisma.word.findMany({
      where: {
        userId: userId, 
        word: {
          contains: search,
          mode: "insensitive",
        }
      },
      take: ITEMS_PER_PAGE, 
      skip: (page - 1) * ITEMS_PER_PAGE, 
      orderBy: {
        createdAt: "desc", 
      }
    });

    const updatedWords =  words.map((word) => ({
      ...word,
      selected: false  
    }));

    return {
      updatedWords, totalPages, totalWords
    }
  } catch (error) {
    console.error('Error fetching user words:', error);
    throw new Error('Failed to fetch user words');
  }
}

export async function fetchWordById(id: string) {
  try {
    const word = await prisma.word.findFirst({
      where: {
        id: id
      },
    })

    return word
  } catch (error) {
    console.error("Error getting word:", error);
    throw new Error('Failed to fetch word.');
  }
}

export async function getTranslationWords(word: {id: string, translation: string}): Promise<TranslationOption[]> {
  try {
    const randomWords: Word[] = await prisma.$queryRaw`
      SELECT * FROM "Word" 
      WHERE id <> ${word.id} 
      ORDER BY RANDOM() 
      LIMIT 3;
    `;

    const options = randomWords.map(word => {
      return {
        id: word.id,
        translation: word.translation
      }
    })

    return [...[word], ...options].sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error getting word:", error);
    throw new Error('Failed to fetch word.');
  }
}