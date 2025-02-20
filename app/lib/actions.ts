'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import isoCodes from "./languages-code-list.json"; 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { signOut } from "@/auth";

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

export async function convertISO3toISO1(iso3: string) {
  const iso1 = isoCodes.find((codes: any) => codes['alpha3-b'] === iso3);

  return iso1?.alpha2 || null; 
} 

async function loadDictionary(langCode: string) {
  const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';

  console.log(inDevEnvironment , ' dev ene ')
  try {
    const baseUrl = !inDevEnvironment ?
      process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000"

    const affRes = await fetch(`${baseUrl}/dictionaries/${langCode}/index.aff`);
    const aff = await affRes.text(); 

    const dicRes = await fetch(`${baseUrl}/dictionaries/${langCode}/index.dic`);
    const dic = await dicRes.text();

    const { default: Nspell } = await import("nspell");
    return new Nspell(aff, dic);
  } catch (error) {
    console.error(`Словник для мови "${langCode}" не знайдено`, error);
    return null;
  }
}


export async function checkWord(word: string, langCode: string) {
  const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';

  const iso1Code = await convertISO3toISO1(langCode)

  console.log(iso1Code, ' iso code')
  // const dict = await loadDictionary(iso1Code || 'en');
  
  // if (!dict) return { correct: false, suggestions: [] };

  // const isCorrect = await dict.spell(word);
  // const suggestions = isCorrect.correct ? [] : dict.suggest(word);

  // return { correct: isCorrect, suggestions };
  // const baseUrl =
  //     process.env.NEXT_PUBLIC_SITE_URL || // Використовуємо URL з .env, якщо є
  //     (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
const baseUrl = !inDevEnvironment ?
      process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000"

      console.log(baseUrl, ' baser')

  const res = await fetch(`${baseUrl}/api/spellcheck`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, langCode: iso1Code }),
  });

  console.log(res, ' rs')
  //return res;
  const data = await res.json();
  console.log(data, ' data')
  return data
}