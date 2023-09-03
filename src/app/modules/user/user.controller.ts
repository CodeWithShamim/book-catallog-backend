import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { User } from '@prisma/client';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserService.createUser(data);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully.',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();

  sendResponse<Omit<User, 'password'>[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully.',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User getched successfully.',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user as never;
  const result = await UserService.getMyProfile(userData);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile information retrieved successfully.',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully.',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully.',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  getMyProfile,
  updateUser,
  deleteUser,
};
