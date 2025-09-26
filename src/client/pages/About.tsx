import React from 'react';
import { Link, Head } from '@inertiajs/react';

interface Props {
  title: string;
  description: string;
}

export default function About({ title, description }: Props) {
  return (
    <>
      <Head title="About" />
      <div className="max-w-4xl mx-auto p-6">
        <nav className="mb-8 pb-4 border-b border-gray-200">
          <Link href="/" className="mr-6 text-gray-900 hover:underline">Home</Link>
          <Link href="/users" className="mr-6 text-gray-900 hover:underline">Users</Link>
        </nav>
        
        <h1 className="text-3xl font-light mb-6">{title}</h1>
        <p className="text-gray-700 mb-6">{description}</p>
      </div>
    </>
  );
}