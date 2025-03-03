'use server';

import { TranslationData, WordData } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { LearningProgress, Level, Word } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function checkWord(word: string, langCode: string) {
  const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';

  const baseUrl = !inDevEnvironment ?
      process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000"

  const res = await fetch(`${baseUrl}/api/spellcheck`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, langCode }),
  });

  const data = await res.json();

  return data
}

export async function generateWordTranslation(formData: WordData): Promise<TranslationData> {
  const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';

  const baseUrl = !inDevEnvironment ?
      process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000"

  const res = await fetch(`${baseUrl}/api/google-generative`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

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