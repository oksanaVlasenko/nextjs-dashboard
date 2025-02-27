'use client';

import {
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useActionState } from 'react';
import { createUser, UserState } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const initialState: UserState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState,
  );
 
  return (
    <form action={formAction}>
      <div className="flex flex-wrap -m-3 mb-3">
        <div className="w-full p-3">
          <div>
            <label
              className="block mb-3 text-neutral-600 font-medium tracking-tight"
              htmlFor="name"
            >
              Name
            </label>
            <div className="w-full">
              <input
                className="w-full custom-input"
                id="name"
                type="text"
                name="name"
                placeholder="ex. Jane Smith"
                required
                aria-describedby="name-error"
              />
            </div>

            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className='mt-4'>
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
                aria-describedby="email-error"
              />
            </div>

            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
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
                aria-describedby="password-error"
              />
            </div>

            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <div className="w-full p-3">
          <Button aria-disabled={isPending}>
            Register now 
          </Button>
        </div>
        
        <div 
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state?.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
