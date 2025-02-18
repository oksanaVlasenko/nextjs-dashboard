'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

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

    const filteredCountries = countries
      .filter((country: any) => country.name.common.toLowerCase() !== 'russia' 
        &&  country.name.common.toLowerCase() !== 'belarus' 
        && Object.keys(country.languages).length > 0)
      .map((country: any) => {
        const entries = Object.entries(country.languages);
        
        const nonEnglish = entries.find(([code]) => code !== "eng");
        
        const mainLang = nonEnglish || entries[0];

        return {
          flag: country.flags.png,
          id: mainLang[0],
          label: mainLang[1]
        }
      })
      .sort((a: any, b: any) => a.label.localeCompare(b.label));
    
    return filteredCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
