import { Hono } from 'hono';
import { InertiaAdapter } from './adapter';

type Env = {
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Env }>();

const inertia = new InertiaAdapter({
  version: '1',
});

// Helper to handle Inertia responses
async function inertiaPage(c: any, component: string, props: any = {}, pageProps: any = {}) {
  const result = inertia.render(c, component, props);
  
  if (result instanceof Response) {
    return result; // Inertia XHR request
  }
  
  // First page load - load template and render HTML
  const templateResponse = await c.env.ASSETS.fetch(new URL('/template.html', c.req.url));
  if (!templateResponse.ok) {
    throw new Error('Template not found');
  }
  
  const template = await templateResponse.text();
  
  const html = template
    .replace('{{TITLE}}', pageProps.title || 'Inertia App')
    .replace('{{HEAD}}', pageProps.head || '')
    .replace('{{PAGE_DATA}}', JSON.stringify(result).replace(/"/g, '&quot;'))
    .replace('{{CLIENT_ENTRY}}', '/app.js');
  
  return c.html(html);
}

app.get('/', async (c) => {
  // Example: Fetch weather data from a third-party API
  let weather = null;
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
    weather = await response.json();
  } catch (error) {
    console.error('Weather API failed:', error);
  }

  return inertiaPage(c, 'Home', {
    message: 'Welcome to Cloudflare Workers with Inertia.js!',
    timestamp: new Date().toISOString(),
    weather,
  }, {
    title: 'Home - Inertia App'
  });
});

app.get('/about', (c) => {
  return inertiaPage(c, 'About', {
    title: 'About Us',
    description: 'This is an Inertia.js app running on Cloudflare Workers with Hono.',
  }, {
    title: 'About - Inertia App'
  });
});

app.get('/users', (c) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  return inertiaPage(c, 'Users', { users }, {
    title: 'Users - Inertia App'
  });
});

app.get('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];
  
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return c.notFound();
  }

  return inertiaPage(c, 'User', { user }, {
    title: `${user.name} - Inertia App`
  });
});

export default app;