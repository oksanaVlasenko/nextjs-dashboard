import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { User, Level } from "@prisma/client"; 

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      languageFrom?: string;
      languageTo?: string;
      level?: Level;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string; 
    languageFrom?: string;
    languageTo?: string;
    level?: Level;
  }

  interface JWT {
    id: string;
    languageFrom?: string;
    languageTo?: string;
    level?: Level;
  }
}
