import { Hono } from 'hono';
import routes from './routes/route';
import { Variables } from 'hono/types';

export type Bindings = {
	ASSETS: any; // Cloudflare Workers asset handler
};

const app = new Hono<{
	Bindings: Bindings;
	Variables: Variables;
}>();

// Asset handling middleware
const assetExt = /\.(js|css|png|jpg|jpeg|svg|ico|map)$/i;
app.use('*', async (c, next) => {
	const path = new URL(c.req.url).pathname;
	if (assetExt.test(path)) {
		const res = await c.env.ASSETS.fetch(c.req.raw);
		// Always return asset response (even 404s), avoids HTML fallback
		return res;
	}

	return next();
});

app.route('/', routes);

export default app;
