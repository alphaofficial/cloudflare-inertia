import { Context } from 'hono';

export class InertiaAdapter {
	private version: string;

	constructor(options: { version: string }) {
		this.version = options.version;
	}

	render(c: Context, component: string, props: any = {}) {
		const isInertiaRequest = c.req.header('X-Inertia') === 'true';

		if (isInertiaRequest) {
			const currentVersion = c.req.header('X-Inertia-Version');

			if (currentVersion !== this.version) {
				return new Response('', {
					status: 409,
					headers: {
						'X-Inertia-Location': c.req.url,
					},
				});
			}

			return c.json(
				{
					component,
					props,
					url: c.req.url,
					version: this.version,
				},
				{
					headers: {
						Vary: 'Accept',
						'X-Inertia': 'true',
					},
				}
			);
		}

		return {
			component,
			props,
			url: c.req.url,
			version: this.version,
		};
	}
}
