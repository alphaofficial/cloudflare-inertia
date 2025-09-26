import React from 'react';
import { Link, Head } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  users: User[];
}

export default function Users({ users }: Props) {
  return (
    <>
      <Head title="Users" />
      <div className="max-w-4xl mx-auto p-6">
        <nav className="mb-8 pb-4 border-b border-gray-200">
          <Link href="/" className="mr-6 text-gray-900 hover:underline">Home</Link>
          <Link href="/about" className="mr-6 text-gray-900 hover:underline">About</Link>
        </nav>
        
        <h1 className="text-3xl font-light mb-6">Users Directory</h1>
        
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="border border-gray-200 p-4">
              <h3 className="text-lg font-medium mb-2">
                <Link href={`/users/${user.id}`} className="text-gray-900 hover:underline">
                  {user.name}
                </Link>
              </h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}