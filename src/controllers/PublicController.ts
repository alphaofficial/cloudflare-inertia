import { Context } from 'hono';
import { BaseController } from './BaseController';

export class PublicController extends BaseController {
	constructor() {
		super();
	}

	private userList = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
	];

	async index(c: Context) {
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

		return this.render(c, 'Home', data);
	}

	about(c: Context) {
		return this.render(c, 'About', {
			title: 'About Us',
			description: 'This is an Inertia.js app running on Cloudflare Workers with Hono.',
		});
	}

	users(c: Context) {
		return this.render(c, 'Users', { users: this.userList });
	}

	user(c: Context) {
		const { id } = c.req.param();
		const user = this.userList.find((u) => u.id === parseInt(id));
		if (!user) {
			return c.notFound();
		}

		return this.render(c, 'User', { user });
	}
}
