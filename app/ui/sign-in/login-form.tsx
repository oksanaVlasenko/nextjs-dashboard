'use client';

import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/button';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '@/app/lib/user/actions';
import Input from '@/app/ui/components/input';

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
          <Input 
            isControlled={false}
            label='Email'
            className="w-full custom-input"
            id="email"
            type="email"
            name="email"
            placeholder="ex. d.duncan@email.com"
            required
          />

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
          />
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
