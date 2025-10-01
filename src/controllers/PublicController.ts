import { Context } from 'hono';
import { BaseController } from './BaseController';

interface User {
	id: number;
	name: string;
	email: string;
}

export class PublicController extends BaseController {
	private userDirectory: User[] = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
	];

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

	static about(c: Context) {
		const instance = new PublicController();
		return instance.render(c, 'About', {
			title: 'About Us',
			description: 'This is an Inertia.js app running on Cloudflare Workers with Hono.',
		});
	}

	static users(c: Context) {
		const instance = new PublicController();
		return instance.render(c, 'Users', { users: instance.userDirectory });
	}

	static user(c: Context) {
		const { id } = c.req.param();
		const instance = new PublicController();
		const user = instance.userDirectory.find((u: User) => u.id === parseInt(id));
		if (!user) {
			return c.notFound();
		}

		return instance.render(c, 'User', { user });
	}
}
