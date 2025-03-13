import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import GithubProviver from "next-auth/providers/github"
import DiscordProviver from "next-auth/providers/discord"
import { prisma } from "@/prisma";


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    DiscordProviver({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
    }),
    GithubProviver({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials:{
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password'}
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(" Invalid credentials");  
        }

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          const user = await prisma.user.findUnique({
            where: {
              email: email, 
            },
          })
          
          if (!user) return null;

          if (!user.hashedPassword) return null 

          console.log(user, ' user ')

          const passwordsMatch = await bcrypt.compare(password, user?.hashedPassword);

          console.log(passwordsMatch, ' passwordsMatch')
          
          if (passwordsMatch) return user;
        }
 
        console.log('AFTER RETURN USER ')
        return null;
      },
    }),
  ],
});

