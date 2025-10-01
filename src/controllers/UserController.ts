import { Context } from 'hono';
import { BaseController } from './BaseController';

interface User {
	id: number;
	name: string;
	email: string;
}

export class UserController extends BaseController {
	private userDirectory: User[] = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
	];

	static async index(c: Context) {
		const instance = new UserController();
		return instance.render(c, 'Users', { users: instance.userDirectory });
	}

	static show(c: Context) {
		const { id } = c.req.param();
		const instance = new UserController();
		const user = instance.userDirectory.find((u: User) => u.id === parseInt(id));
		if (!user) {
			return c.notFound();
		}

		return instance.render(c, 'User', { user });
	}
}
