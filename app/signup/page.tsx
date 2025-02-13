import SocialSignIn from '@/app/ui/sign-in/social-signin';
import SignUpForm from '@/app/ui/sign-in/signup-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import AuthContainer from '@/app/ui/sign-in/auth-container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return (
    <main>
      <AuthContainer>
        <Suspense>
          <SocialSignIn />
        </Suspense>
        
        <p className="text-center text-neutral-600 font-medium tracking-tight mb-4">OR</p>

        <Suspense>
          <SignUpForm />
        </Suspense>

        <Link
          className="inline-block text-neutral-600 text-sm font-medium hover:text-neutral-800 tracking-tight transition duration-200" 
          href="/login"
        >
          Already have an account? Log in
        </Link>
      </AuthContainer>
    </main>
  );
}