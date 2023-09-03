import express from 'express';
import { UserRoute } from '../modules/user/user.route';
import { CategoryRoute } from '../modules/category/category.route';
import { BookRoute } from '../modules/book/book.route';
import { OrderRoute } from '../modules/order/order.route';

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
    path: '/profile',
    route: UserRoute,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/books',
    route: BookRoute,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
