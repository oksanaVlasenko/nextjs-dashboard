'use client';

import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  console.log('Callback URL:', callbackUrl);
 
  return (
    <form action={formAction}>
      <div className="flex flex-wrap -m-3 mb-3">
        <div className="w-full p-3">
          <div>
            <label
              className="block mb-3 text-neutral-600 font-medium tracking-tight"
              htmlFor="email"
            >
              Email
            </label>
            <div className="w-full">
              <input
                className="w-full custom-input"
                id="email"
                type="email"
                name="email"
                placeholder="ex. d.duncan@email.com"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block mb-3 text-neutral-600 font-medium tracking-tight"
              htmlFor="password"
            >
              Password
            </label>
            <div className="w-full">
              <input
                className="w-full custom-input"
                id="password"
                type="password"
                name="password"
                placeholder="******"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <div className="w-full p-3">
          <Button aria-disabled={isPending}>
            Log in 
          </Button>
        </div>
        

        {errorMessage && (
          <div 
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
}
