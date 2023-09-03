/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import argon2 from 'argon2';
import { IUserData } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createUser = async (payload: User): Promise<User> => {
  payload.password = await argon2.hash(payload.password);

  const result: any = await prisma.user.create({
    data: payload,
  });

  result.password = undefined;

  return result;
};

const getAllUser = async (): Promise<Omit<User, 'password'>[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result: any = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  result.password = undefined;
  return result;
};

const getMyProfile = async (userData: IUserData): Promise<User | null> => {
  const result: any = await prisma.user.findUnique({
    where: {
      id: userData.userId,
    },
  });

  if (!result?.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  result.password = undefined;
  return result;
};

const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const result: any = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  result.password = undefined;
  return result;
};

const deleteUser = async (id: string): Promise<User> => {
  const result: any = await prisma.user.delete({
    where: {
      id,
    },
  });
  result.password = undefined;
  return result;
};

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  getMyProfile,
  updateUser,
  deleteUser,
};
