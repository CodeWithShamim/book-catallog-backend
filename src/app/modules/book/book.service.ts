/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IFilters } from './book.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import handleFilters from '../../../shared/hanldeFilters';
import { BookSearchableFields } from './book.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBook = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const whereConditions = handleFilters(filters, BookSearchableFields);
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: true,
    },
  });

  return {
    meta: {
      page,
      size,
      total: result.length,
      totalPage: Math.ceil(result.length / size),
    },
    data: result,
  };
};

const getBookByCategory = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: size,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: true,
    },
  });

  return {
    meta: {
      page,
      size,
      total: result.length,
      totalPage: Math.ceil(result.length / size),
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBook,
  getSingleBook,
  getBookByCategory,
  updateBook,
  deleteBook,
};
