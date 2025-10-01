import { Context } from 'hono';

interface SharedData {
	auth?: {
		user?: any;
	};
	flash?: {
		success?: string | null;
		error?: string | null;
	};
	[key: string]: any;
}

export class InertiaAdapter {
	private version: string;
	private sharedData: SharedData = {};

	constructor(options: { version: string }) {
		this.version = options.version;
	}

	// Set shared data that will be available on all pages
	share(key: string, value: any): void;
	share(data: SharedData): void;
	share(keyOrData: string | SharedData, value?: any): void {
		if (typeof keyOrData === 'string') {
			this.sharedData[keyOrData] = value;
		} else {
			this.sharedData = { ...this.sharedData, ...keyOrData };
		}
	}

	render(c: Context, component: string, props: any = {}) {
		// Merge shared data with page-specific props
		const finalProps = { ...this.sharedData, ...props };

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
					props: finalProps,
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
			props: finalProps,
			url: c.req.url,
			version: this.version,
		};
	}
}
