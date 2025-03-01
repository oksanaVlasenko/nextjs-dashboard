'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { signOut } from "@/auth";
import { TranslationData, WordData } from './definitions';
import isoCodes from './languages-code-list.json'
import { prisma } from "@/prisma"
import { Level, LearningProgress, User, Word } from "@prisma/client";

export async function logout() {
  await signOut({ redirectTo: "/" });
}

const RegisterSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  image_url: z.string()
});

const CreateUser = RegisterSchema.omit({ id: true, image_url: true });

export type UserState = {
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: UserState, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;
  
  if (existingUser && existingUser.rows[0]) {
    return {
      message: 'Email already in use',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES ( ${name}, ${email}, ${hashedPassword})
    `;

    const newUser = await sql`SELECT * FROM users WHERE email=${email}`;

    if (!newUser.rowCount) {
      return { message: "User creation failed" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false, 
    });

  } catch (error) {
    console.log(error, ' error creation')
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  redirect('/dashboard');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const FormUserSchema = z.object({
  id: z.string(),
  languageFrom: z.string(),
  name: z.string().min(2),
  languageTo: z.string(),
  level: z.enum([Level.A1, Level.A2, Level.B1, Level.B2, Level.C1, Level.C2])
});
 
const UpdateUserInfo = FormUserSchema.omit({ id: true });

export type UserInfoState = {
  errors?: {
    languageFrom?: string[] | null;
    name?: string[] | null;
    languageTo?: string[] | null;
    level?: string[] | null;
  };
  message?: string | null;
  user?: User | null
};

export async function updateUser(
  id: string, 
  prevState: UserInfoState, 
  formData: FormData
) {  
  const validatedFields = UpdateUserInfo.safeParse({
    name: formData.get('name'),
    languageFrom: formData.get('languageFrom'),
    languageTo: formData.get('languageTo'),
    level: formData.get('level')
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
      user: null
    };
  }
 
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id, 
      },
      data: {
        ...validatedFields.data, 
      } 
    });

    revalidatePath('/settings');

    const session = await auth();
    
    if (session) {
      session.user = {
        ...session.user,
        ...validatedFields.data
      };
    }

    return { errors: {}, message: 'Success', user: updatedUser }
  } catch (error) {
    console.error('Error updating user:', error);
    return { message: 'Database Error: Failed to Update User.', errors: {}, user: null }
  }

  
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
  
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {  
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

export async function convertISO3toISO1(iso3: string): Promise<string | null> {
  const iso1 =  isoCodes.find((codes: any) => codes['alpha3-b'] === iso3)?.alpha2;
  return iso1 || null; 
}

export async function fetchCountriesByLanguage() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,languages,flags`);

    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const countries = await response.json();

    const uniqueLanguages = new Map();
      
    const filteredCountries = countries
      .filter((country: any) => 
        country.name.common.toLowerCase() !== 'russia' &&
        country.name.common.toLowerCase() !== 'belarus' &&
        Object.keys(country.languages).length > 0
      )
      .map((country: any) => {
        const langEntries = Object.entries(country.languages);
        const mainLang = langEntries.find(([code]) => code !== 'eng') || langEntries[0];
  
        return {
          flag: country.flags.png,
          id: mainLang[0],
          label: mainLang[1],
          name: country.name.common
        };
      })
      .sort((a: any, b: any) => a.label.localeCompare(b.label));

      for (const country of filteredCountries) {
        if (country.id === 'eng') {
          if (country.name === 'United States') {
            uniqueLanguages.set(country.id, country);
          }
        } else {
          if (!uniqueLanguages.has(country.id)) {
            uniqueLanguages.set(country.id, country);
          }
        }
      }

    return Array.from(uniqueLanguages.values());
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

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
  userId: string;
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
  try {
    await prisma.word.create({
      data: { 
        ...wordData 
      },
    });

    //return { success: true, word: newWord };
  } catch (error) {
    console.error("Error adding word:", error);
    return { success: false, error: "Failed to add word" };
  }

  revalidatePath('/dashboard');  
  redirect('/dashboard'); 
}

const ITEMS_PER_PAGE = 5;

export async function getWordsTotalPages(query:string, userId: string) {
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
  userId,
  page = 1,
  search = ""

}: {
  userId: string;
  page?: number;
  search?: string;
}) {
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

export async function updateWordsProgress(id: string, 
  newWordData: { 
    learningProgress?: LearningProgress;
    progress?: number
  }) {
  try {
    const updatedWord = await prisma.word.update({
      where: {
        id: id, 
      },
      data: {
        ...newWordData, 
      },
    });

    console.log('Updated word:', updatedWord);
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

const imageSchema = z.instanceof(File).refine(
  (file) => file.type.startsWith("image/"),
  { message: "The file must be an image!" }
);

export type UserAvatarState = {
  errors?: {
    file?: string[] | null;
  };
  message?: string | null;
  user?: User | null
};

export async function uploadPhoto(
  id: string, 
  file: File
) {
  if (!file) return {
    message: 'Missing Fields. No file provided.'
  };

  const validateImage = imageSchema.safeParse(file);
  
  if (!validateImage.success) {
    return {
      message: validateImage.error.errors.map(err => err.message),
    };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    console.log(formData , ' form data client')
    const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';

    const baseUrl = !inDevEnvironment ?
        process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) return {
      message: 'Upload failed',
    };

    const avatarUrl = await response.json();

    await prisma.user.update({
      where: {
        id: id, 
      },
      data: {
        image: avatarUrl.url, 
      } 
    });

    revalidatePath('/settings');

    const session = await auth();
    
    if (session) {
      session.user = {
        ...session.user,
        image: avatarUrl.url,
      };
    }

    return { message: 'Success' }
  } catch (error) {
    console.error('Error updating user:', error);
    return { message: 'Database Error: Failed to Update Avatar' }
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