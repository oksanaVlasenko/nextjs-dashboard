'use server';

import { ArticleType, SpellCheckType, TranslationData, WordData } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { LearningProgress, Level, Word } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isValidArticleArray } from "./wordUtils";
import { api } from "@/app/lib/api";

export async function checkWord(word: string, langCode: string): Promise<SpellCheckType> {
  try {
    const data: SpellCheckType = await api.post('api/spellcheck', { word, langCode })

    return data
  } catch (error) {
    console.error("Error checkWord:", error);
    throw error;
  }
}

interface WordExpore extends WordData {
  type: string
}

export async function generateExporeWord(formData: Partial<WordExpore>): Promise<ArticleType[]> {
  const { word, type } = formData
  
  if (!word) {
    throw new Error("Word is required for caching");
  }

  const cachedResult = await prisma.searchCache.findUnique({ 
    where: { word } 
  }); 

  if (cachedResult && type && cachedResult[type as keyof typeof cachedResult]) {
    const result = cachedResult[type as keyof typeof cachedResult]

    if (result && isValidArticleArray(result)) {
      return result;
    }
  }

  let data: ArticleType[]

  try {
    data = await api.post('api/explore-word', formData)
  } catch (error) {
    console.error("Error explore-word:", error);
    throw error;
  }

  await prisma.searchCache.upsert({
    where: { word },
    update: { [type as keyof typeof cachedResult]: data, updatedAt: new Date() },
    create: { word, [type as keyof typeof cachedResult]: data },
  });

  return data
}


export async function generateWordTranslation(formData: WordData): Promise<TranslationData> {
  let data : {
    result: string
  }

  try {
    data = await api.post('api/google-generative', formData);
  } catch (error) {
    console.error("Error google-generative:", error);
    throw error;
  }

  let jsonObject: TranslationData = {
    translation: '',
    explanation: '',
    transcription: '',
    example1: '',
    example2: ''
  }
  
  const match = data.result.match(/```json\n([\s\S]*?)\n```/);
  
  if (match) {
    try {
      jsonObject = JSON.parse(match[1]);
    } catch (error) {
      console.error("Помилка парсингу JSON:", error);
    }
  }

  return jsonObject
}

export async function deleteWordAction(wordId: string) {
  const word = await prisma.word.findFirst({
    where: {
      id: wordId
    },
  })

  const existingRecord = await prisma.searchCache.findUnique({
    where: {
      word: word?.word, 
    },
  });

  if (existingRecord) {
    await prisma.searchCache.delete({
      where: {
        word: word?.word
      }
    })
  }

  await prisma.word.delete({
    where: {
      id: wordId,
    },
  });

  revalidatePath('/dashboard');
}

export async function createWordAction(wordData: {
  word: string;
  translation: string;
  explanation: string;
  transcription: string;
  languageFrom: string;
  languageTo: string;
  level: Level;
  learningProgress: LearningProgress;
  example1: string;
  example2: string;
  progress: number
}) {
  const session = await auth();
  const userId = session?.user?.id ?? '';

  try {
    await prisma.word.create({
      data: { 
        ...wordData,
        userId
      },
    });

  } catch (error) {
    console.error("Error adding word:", error);
    return { success: false, error: "Failed to add word" };
  }

  revalidatePath('/dashboard');  
  redirect('/dashboard'); 
}

export async function updateWordsProgress(id: string, 
  newWordData: { 
    learningProgress?: LearningProgress;
    progress?: number
  }) {
  try {
    await prisma.word.update({
      where: {
        id: id, 
      },
      data: {
        ...newWordData, 
      },
    });

    revalidatePath('/learning');
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error updating word:', error);
    return null;
  }
}

const FormWordSchema = z.object({
  id: z.string(),
  translation: z.string(),
  explanation: z.string(),
  example1: z.string(),
  example2: z.string()
})

const UpdateWordInfo = FormWordSchema.omit({ id: true })

export type WordInfoState = {
  errors?: {
    translation?: string[] | null;
    explanation?: string[] | null;
    example1?: string[] | null;
    example2?: string[] | null;
  };
  message?: string | null;
  word?: Word | null
};

export async function updateWord(
  id: string, 
  prevState: WordInfoState, 
  formData: FormData
) {
  const validatedFields = UpdateWordInfo.safeParse({
    translation: formData.get('translation'),
    explanation: formData.get('explanation'),
    example1: formData.get('example1'),
    example2: formData.get('example2')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Word.',
      word: null
    };
  }

  try {
    const updatedWord = await prisma.word.update({
      where: {
        id: id, 
      },
      data: {
        ...validatedFields.data
      },
    });

    revalidatePath(`/dashboard/${id}/edit`)
    
    return { errors: {}, message: 'Success', word: updatedWord }
  } catch (error) {
    console.error('Error updating word:', error);
    return { message: 'Database Error: Failed to Update Word.', errors: {}, word: null }
  }
}