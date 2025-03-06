'use client';

import {
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/components/button';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createUser, UserState } from '@/app/lib/user/actions';
import Input from '@/app/ui/components/input';

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
          <Input 
            isControlled={false}
            label='Name'
            className="w-full custom-input"
            id="name"
            type="text"
            name="name"
            placeholder="ex. Jane Smith"
            required
            aria-describedby="name-error"
          />

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <Input 
            isControlled={false}
            containerClassname='mt-4'
            label='Email'
            className="w-full custom-input"
            id="email"
            type="email"
            name="email"
            placeholder="ex. d.duncan@email.com"
            required
            aria-describedby="email-error"
          />

          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <Input 
            isControlled={false}
            containerClassname='mt-4'
            label='Password'
            className="w-full custom-input"
            id="password"
            type="password"
            name="password"
            placeholder="******"
            required
            minLength={6}
            aria-describedby="password-error"
          />

          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
