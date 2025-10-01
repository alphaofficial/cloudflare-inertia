import { Context, Next } from 'hono';
import { InertiaAdapter } from '../adapters/InertiaHonoAdapter';

// Extend Hono's context to include Inertia
declare module 'hono' {
	interface ContextVariableMap {
		inertia: InertiaAdapter;
	}
}

export class InertiaMiddleware {
	static async run(c: Context, next: Next) {
		const inertia = new InertiaAdapter({
			version: '1',
		});

		inertia.share({
			applicationName: 'Cloudflare Inertia App',
		});

		c.set('inertia', inertia);

		await next();
	}
}
