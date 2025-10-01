import { PageName } from '../config/pages';
import { InertiaAdapter } from '../adapters/InertiaHonoAdapter';

export class BaseController {
	public async render(c: any, componentName: PageName, componentProps: any = {}, documentMetadata: any = {}) {
		const inertia = new InertiaAdapter({
			version: '1',
		});
		const result = inertia.render(c, componentName, componentProps);

		if (result instanceof Response) {
			return result;
		}

		const templateResponse = await c.env.ASSETS.fetch(new URL('/template.html', c.req.url));
		if (!templateResponse.ok) {
			throw new Error('Template not found');
		}

		const template = await templateResponse.text();

		const html = template
			.replace('{{TITLE}}', documentMetadata.title || 'Inertia App')
			.replace('{{HEAD}}', documentMetadata.head || '')
			.replace('{{PAGE_DATA}}', JSON.stringify(result).replace(/"/g, '&quot;'))
			.replace('{{CLIENT_ENTRY}}', '/app.js');

		return c.html(html);
	}
}
