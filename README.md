# Cloudflare Workers + Inertia.js

A modern full-stack application using Cloudflare Workers, Hono, Inertia.js, React, and Tailwind CSS.

## Architecture Overview

This project demonstrates how Inertia.js bridges server-side and client-side rendering to create a seamless single-page application experience.

### How Inertia.js Works

Inertia.js provides a hybrid approach that combines the best of server-side rendering and single-page applications:

#### 1. **Hybrid Initial Load + XHR Navigation**

**First page load (SSR-like):**

- Server renders full HTML with embedded page data in `data-page` attribute
- React hydrates from this initial state
- No client-side routing needed initially

**Subsequent navigation (SPA-like):**

- Inertia intercepts link clicks and form submissions
- Makes XHR requests with `X-Inertia: true` header
- Server returns JSON instead of HTML
- Client updates the page without full reload

#### 2. **Dynamic Data Updates**

Every Inertia navigation:

- Executes the full server-side route handler
- Fetches fresh data from APIs/databases (like the weather API in this example)
- Returns updated props to the client
- Client re-renders component with new data

This ensures your data is always fresh and eliminates client/server state synchronization issues.

#### 3. **Shared Data & Functions**

**Shared data** can be passed to all pages:

```typescript
// Server-side - available to all components
return inertiaPage(
	c,
	'Home',
	{
		weather, // Page-specific data
	},
	{
		title: 'Home',
		// Shared data available to all components
		user: await getCurrentUser(),
		flash: getFlashMessages(),
		csrf: generateCSRFToken(),
	}
);
```

**Shared functions** are typically utility functions available across components:

- Authentication helpers (`can()`, `cannot()`)
- URL generation (`route()`)
- Asset helpers (`asset()`)
- Validation utilities
- Date/time formatters

#### 4. **Form Handling & POST Requests**

POST requests are handled server-side by your route handlers:

```typescript
// Server-side route handler
app.post('/users', async (c) => {
	const { name, email } = await c.req.parseBody();

	// Validate data
	if (!name || !email) {
		return inertiaPage(c, 'Users/Create', {
			errors: { name: 'Name is required', email: 'Email is required' },
		});
	}

	// Save to database
	const user = await createUser({ name, email });

	// Redirect with success message
	return c.redirect('/users');
});
```

```jsx
// Client-side form component
import { useForm } from '@inertiajs/react';

export default function CreateUser() {
	const { data, setData, post, processing, errors } = useForm({
		name: '',
		email: '',
	});

	const submit = (e) => {
		e.preventDefault();
		post('/users'); // Makes XHR to server, handles response
	};

	return (
		<form onSubmit={submit}>
			<input value={data.name} onChange={(e) => setData('name', e.target.value)} />
			{errors.name && <div>{errors.name}</div>}

			<button disabled={processing}>Create User</button>
		</form>
	);
}
```

#### 5. **Key Benefits**

- **Always Fresh Data**: Every navigation fetches current server state
- **No Client State Sync Issues**: Server is the source of truth
- **SPA Feel**: No page reloads after initial load
- **Progressive Enhancement**: Works even if JS fails
- **SEO Friendly**: First load is server-rendered HTML
- **Simple Mental Model**: Just think server-side, get SPA benefits

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono (lightweight web framework)
- **Frontend**: React 19 + Inertia.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts both the Vite build watcher and Wrangler dev server.

### Build

```bash
npm run build
```

Builds the client-side assets to the `public` directory.

### Deploy

```bash
npm run deploy
```

Builds and deploys to Cloudflare Workers.

## Project Structure

```
src/
├── adapter/          # Custom Inertia.js adapter for Hono
├── client/          # Client-side React application
│   ├── pages/       # Inertia.js page components
│   ├── app.tsx      # Client entry point
│   └── app.css      # Global styles
└── index.ts         # Server-side Worker code

public/              # Build output and static assets
├── app.js          # Built client bundle
├── app.css         # Built styles
└── template.html   # HTML template for SSR
```

## Example Routes

- `/` - Home page with weather data
- `/about` - About page
- `/users` - Users listing
- `/users/:id` - Individual user page

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## License

MIT
