'use server';

import { auth } from "@/auth";
import { prisma } from "@/prisma";

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