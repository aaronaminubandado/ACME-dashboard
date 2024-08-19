'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../lib/firebase-auth';

export default function SignupForm() {
  // State variables for email, password, confirmation, error message, and form submission status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // Handle form submission
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setIsPending(true); // Set pending state to true

    if (password !== confirmation) {
      setError("Passwords don't match");
      setIsPending(false); // Reset pending state
      return;
    }

    try {
      await register(email, password);
      router.push("/login");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsPending(false); // Reset pending state
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Sign up for an account.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email} // Bind input value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={password} // Bind input value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirm-password"
                type="password"
                name="confirm-password"
                placeholder="Confirm your password"
                value={confirmation} // Bind input value to state
                onChange={(e) => setConfirmation(e.target.value)} // Update state on change
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-4 w-full" aria-disabled={isPending}>
          {isPending ? 'Signing up...' : 'Sign up'}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              log in here.
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
