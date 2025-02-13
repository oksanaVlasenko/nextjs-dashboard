import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { NextAuthSessionProvider } from './auth-provider'
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: {
    template: '%s | Learning with AI',
    default: 'Learning with AI',
  },
  description: 'Learning languages with AI in a brand-new way!',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextAuthSessionProvider session={session}>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
