import express, { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { UserZodValidation } from './user.validation';
const router: Router = express.Router();

router.post(
  '/signup',
  validateRequest(UserZodValidation.create),
  UserController.createUser
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserZodValidation.update),
  UserController.updateUser
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoute = router;
