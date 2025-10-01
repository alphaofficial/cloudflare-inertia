import { PublicController } from '@/controllers/PublicController';
import { Hono } from 'hono';
import { Bindings, Variables } from 'hono/types';

const route = new Hono<{
	Bindings: Bindings;
	Variables: Variables;
}>();

route.get('/', PublicController.index);
route.get('/about', PublicController.about);
route.get('/users', PublicController.users);
route.get('/users/:id', PublicController.user);

export default route;
