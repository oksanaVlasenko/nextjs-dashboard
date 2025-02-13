import AuthContainer from '@/app/ui/sign-in/auth-container';
import LoginForm from '@/app/ui/sign-in/login-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import SocialSignIn from '@/app/ui/sign-in/social-signin';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main>
      <AuthContainer>
        <Suspense>
          <SocialSignIn />
        </Suspense>
        
        <p className="text-center text-neutral-600 font-medium tracking-tight mb-4">OR</p>

        <Suspense>
          <LoginForm />
        </Suspense>

        <Link
          className="inline-block text-neutral-600 text-sm font-medium hover:text-neutral-800 tracking-tight transition duration-200" 
          href="/signup"
        >
          Don&apos;t have an account? Sign up
        </Link>
      </AuthContainer>
    </main>
  );
}
