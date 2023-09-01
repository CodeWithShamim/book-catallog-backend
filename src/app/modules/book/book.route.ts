import express, { Router } from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BookZodValidation } from './book.validation';
const router: Router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookZodValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

router.get('/', BookController.getAllBook);
router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  validateRequest(BookZodValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateBook
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoute = router;
