export class InertiaAdapter {
	private version: string;

	constructor(options: { version: string }) {
		this.version = options.version;
	}

	render(c: any, component: string, props: any = {}) {
		const isInertiaRequest = c.req.header("X-Inertia") === "true";

		if (isInertiaRequest) {
			// Handle Inertia XHR requests
			const currentVersion = c.req.header("X-Inertia-Version");

			if (currentVersion !== this.version) {
				// Force a full page reload if versions don't match
				return new Response("", {
					status: 409,
					headers: {
						"X-Inertia-Location": c.req.url,
					},
				});
			}

			// Return JSON response for Inertia
			return c.json(
				{
					component,
					props,
					url: c.req.url,
					version: this.version,
				},
				{
					headers: {
						Vary: "Accept",
						"X-Inertia": "true",
					},
				},
			);
		}

		// First page load - return page data for template rendering
		return {
			component,
			props,
			url: c.req.url,
			version: this.version,
		};
	}
}
