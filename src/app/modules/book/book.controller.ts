import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Book } from '@prisma/client';
import pick from '../../../shared/pick';
import { BookFilterableFields } from './book.constant';
import { paginationFields } from '../../../constants/pagination';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BookService.createBook(data);

  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully.',
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await BookService.getAllBook(filters, options);

  sendResponse<Book[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully.',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBook(req.params.id);

  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book getched successfully.',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params.id, req.body);

  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully.',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params.id);

  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully.',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
