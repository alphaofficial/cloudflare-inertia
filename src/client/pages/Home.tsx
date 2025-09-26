import React from 'react';
import { Link, Head } from '@inertiajs/react';

interface Props {
  message: string;
  timestamp: string;
  weather?: any;
}

export default function Home({ message, timestamp, weather }: Props) {
  return (
    <>
      <Head title="Home" />
      <div className="max-w-4xl mx-auto p-6">
        <nav className="mb-8 pb-4 border-b border-gray-200">
          <Link href="/about" className="mr-6 text-gray-900 hover:underline">About</Link>
          <Link href="/users" className="mr-6 text-gray-900 hover:underline">Users</Link>
        </nav>
        
        <h1 className="text-3xl font-light mb-6">Cloudflare Workers + Inertia.js</h1>
        <p className="mb-6 text-gray-700">{message}</p>
        
        {weather && weather.current_weather && (
          <div className="bg-gray-50 p-4 mb-6 border-l-4 border-gray-900">
            <h2 className="text-xl font-light mb-3">Weather in Berlin</h2>
            <p className="text-gray-700">Temperature: {weather.current_weather.temperature}°C</p>
            <p className="text-gray-700">Wind Speed: {weather.current_weather.windspeed} km/h</p>
          </div>
        )}

        <h2 className="text-2xl font-light mb-4">Features</h2>
        <ul className="space-y-2 mb-8">
          <li className="text-gray-700">Server-side rendering on Cloudflare Workers</li>
          <li className="text-gray-700">Client-side navigation with Inertia.js</li>
          <li className="text-gray-700">Third-party API calls (weather data)</li>
          <li className="text-gray-700">React components with TypeScript</li>
          <li className="text-gray-700">Hono framework</li>
        </ul>
        
        <p className="text-sm text-gray-500">Generated at: {timestamp}</p>
      </div>
    </>
  );
}