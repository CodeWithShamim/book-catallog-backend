import express, { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router: Router = express.Router();

router.post('/signup', UserController.createUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);

export const UserRoute = router;
