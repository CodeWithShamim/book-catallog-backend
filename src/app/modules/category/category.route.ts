import express, { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryZodValidation } from './category.validation';
const router: Router = express.Router();

router.post(
  '/create-category',
  validateRequest(CategoryZodValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);

router.patch(
  '/:id',
  validateRequest(CategoryZodValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateCategory
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoute = router;
