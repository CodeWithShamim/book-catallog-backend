import express from 'express';
import { UserRoute } from '../modules/user/user.route';
import { CategoryRoute } from '../modules/category/category.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
