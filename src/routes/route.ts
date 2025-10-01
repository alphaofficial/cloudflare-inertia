import { AboutController } from '@/controllers/AboutController';
import { PublicController } from '@/controllers/PublicController';
import { UserController } from '@/controllers/UserController';
import { Hono } from 'hono';
import { Bindings, Variables } from 'hono/types';

const route = new Hono<{
	Bindings: Bindings;
	Variables: Variables;
}>();

route.get('/', PublicController.index);
route.get('/about', AboutController.index);
route.get('/users', UserController.index);
route.get('/users/:id', UserController.show);

export default route;
