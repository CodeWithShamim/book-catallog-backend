import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import argon2 from 'argon2';

const createUser = async (payload: User): Promise<User> => {
  payload.password = await argon2.hash(payload.password);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const UserService = {
  createUser,
  getAllUser,
};
