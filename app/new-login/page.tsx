import SocialSignIn from '@/app/ui/sign-in/social-signin';
import SignUpForm from '../ui/sign-in/signup-form';
import { Suspense } from 'react';
import Link from 'next/link';
import SideImage from '@/app/ui/sign-in/side-image';

export default function NewLogin() {
  return (
    <section className="bg-neutral-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2">
              <div className="px-8 md:px-16 pt-16 pb-20">
                <span className="inline-block text-neutral-600 text-xl font-semibold tracking-tight mb-4">Account</span>
                <h5 className="text-6xl font-semibold mb-6 font-heading">Try a new learning way</h5>
                <p className="text-neutral-600 font-medium tracking-tight mb-16">At the heart of our success is a diverse and talented team.</p>

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
              </div>
            </div>
            
            <SideImage />
          </div>
        </div>
      </div>
    </section>
  )
}