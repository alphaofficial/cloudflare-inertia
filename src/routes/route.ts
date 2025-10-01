import { AboutController } from '@/controllers/AboutController';
import { PublicController } from '@/controllers/PublicController';
import { UserController } from '@/controllers/UserController';
import { InertiaMiddleware } from '@/middleware/inertia';
import { Hono } from 'hono';
import { Bindings, Variables } from 'hono/types';

const route = new Hono<{
	Bindings: Bindings;
	Variables: Variables;
}>();

route.use('*', InertiaMiddleware.run);

route.get('/', PublicController.index);
route.get('/about', AboutController.index);
route.get('/users', UserController.index);
route.get('/users/:id', UserController.show);

export default route;
