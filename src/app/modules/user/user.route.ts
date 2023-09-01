import express, { Router } from 'express';
import { UserController } from './user.controller';
const router: Router = express.Router();

router.post('/signup', UserController.createUser);

export const UserRoute = router;
