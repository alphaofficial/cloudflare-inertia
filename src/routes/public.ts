import { PublicController } from '@/controllers/PublicController';
import { Hono } from 'hono';
import { Bindings, Variables } from 'hono/types';

const route = new Hono<{
	Bindings: Bindings;
	Variables: Variables;
}>();

const publicController = new PublicController();

route.get('/', publicController.index);
route.get('/about', publicController.about);
route.get('/users', publicController.users);
route.get('/users/:id', publicController.user);

export default route;
