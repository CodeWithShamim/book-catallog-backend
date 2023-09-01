import express, { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router: Router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateCategory
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoute = router;
