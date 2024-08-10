"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/ui/button';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firestore";
import { UserCircleIcon, EnvelopeIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export type Client = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export default function EditClientForm({ client }: { client: Client }) {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [imageUrl, setImageUrl] = useState(client.image_url);
  const [error, setError] = useState('');
  const router = useRouter(); // Corrected to use next/navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const clientRef = doc(db, "clients", client.id);
      await updateDoc(clientRef, {
        name,
        email,
        image_url: imageUrl,
      });
      router.push('/dashboard/clients'); // Redirect to clients list after editing
    } catch (err) {
      setError('Failed to update client. Please try again.');
      console.error('Error updating client:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Client Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Client Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter client name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Client Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Client Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter client email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Client Image URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Client Image URL
          </label>
          <div className="relative">
            <input
              id="image_url"
              name="image_url"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/clients"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Client</Button>
      </div>
    </form>
  );
}
