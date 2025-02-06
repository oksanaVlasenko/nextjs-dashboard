import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { signIn } from '@/auth';
import SignIn from '../ui/signin-google';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>

        <Suspense>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <LoginForm />

            <Divider text="or" />

            <SignIn />
          </div>
          
        </Suspense>
      </div>
    </main>
  );
}

const Divider = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center my-6 w-full">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="px-4 text-gray-500 text-sm font-medium">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};