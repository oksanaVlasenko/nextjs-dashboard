import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { Level } from "@prisma/client"; 

console.log(process.env.VERCEL_ENV, ' process.env.AUTH_SECRET', process.env.NODE_ENV)

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  debug: true,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   if (isPreview) {
    //     return "https://nextjs-dashboard-git-dev-oksana-vlasenkos-projects.vercel.app/api/auth/callback/google";
    //   }
    //   return baseUrl;
    // },

    async authorized({ auth, request: { nextUrl } }) {
      console.log(auth, ' auth')
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ['/dashboard', '/learning', '/settings', '/add-word']

      const isOnDashboard = protectedPaths.some(p => nextUrl.pathname.startsWith(p))
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },

    async session({ session, token }) {
      
      if (token) {
        session.user = {
          id: token.id ? String(token.id) : "",
          name: token.name!,
          email: token.email!,
          image: token.picture!,
          emailVerified: null,
          languageFrom: token.languageFrom ? String(token.languageFrom) : '',
          languageTo: token.languageTo ? String(token.languageTo) : '',
          level: token.level ? token.level as Level : 'B1',
        };
      }

      return session;
    },

    async jwt({ token, user }) {
     
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.languageFrom = user.languageFrom ?? '';
        token.languageTo = user.languageTo ?? '';
        token.level = user.level as Level ?? 'B1' as Level
      }

      return token;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

