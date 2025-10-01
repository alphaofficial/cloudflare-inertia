import { Context } from 'hono';
import { BaseController } from './BaseController';

export class AboutController extends BaseController {
	static async index(c: Context) {
		const instance = new AboutController();
		return instance.render(c, 'About', {
			title: 'About Us',
			description: 'This is an Inertia.js app running on Cloudflare Workers with Hono.',
		});
	}
}
