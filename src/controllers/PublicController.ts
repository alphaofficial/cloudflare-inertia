import { Context } from 'hono';
import { BaseController } from './BaseController';
export class PublicController extends BaseController {
	static async index(c: Context) {
		let weather = null;
		try {
			const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
			weather = await response.json();
		} catch (error) {
			console.error('Weather API failed:', error);
		}

		const data = {
			message: 'Welcome to Cloudflare Workers with Inertia.js!',
			timestamp: new Date().toISOString(),
			weather,
		};

		const instance = new PublicController();
		return instance.render(c, 'Home', data);
	}
}
