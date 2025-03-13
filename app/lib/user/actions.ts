'use server';

import { auth, signIn, signOut } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { AuthError } from "next-auth";
import { prisma } from "@/prisma";
import { Level, User } from "@prisma/client";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { generateFileName } from "./userUtils";
import { api } from "@/app/lib/api";

export async function logout() {
  await signOut({ redirectTo: "/" });
  revalidateTag("session");
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

  const existingUser = await sql`SELECT * FROM user WHERE email=${email}`;
  
  if (existingUser && existingUser.rows[0]) {
    return {
      message: 'Email already in use',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO user (name, email, password)
      VALUES ( ${name}, ${email}, ${hashedPassword})
    `;

    const newUser = await sql`SELECT * FROM user WHERE email=${email}`;

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

  const session = await auth();

  try {
    const avatarUrl = await uploadToS3(file);

    if (session && session.user.image?.includes('my-avatars-files.s3')) {
      try {
        await api.delete('api/delete-avatar', { fileUrl: session.user.image })
      } catch(error) {
        console.error('Failed to delete avatar', error)
        return {
          message: 'Upload failed',
        }
      }
    }

    await prisma.user.update({
      where: {
        id: id, 
      },
      data: {
        image: avatarUrl, 
      } 
    });

    revalidatePath('/settings');
    revalidateTag("session")

    return { message: 'Success' }
  } catch (error) {
    console.error('Error updating user:', error);
    return { message: 'Database Error: Failed to Update Avatar' }
  } 
}

async function uploadToS3(file: File) {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  
  const fileBuffer = await file.arrayBuffer();
  const fileName = generateFileName(file.name);

  const uploadParams = {
    Bucket: process.env.AWS_PHOTO_BUCKET_NAME!,
    Key: fileName,
    Body: Buffer.from(fileBuffer),
    ContentType: file.type,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  const fileUrl = `https://${process.env.AWS_PHOTO_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  return fileUrl
}