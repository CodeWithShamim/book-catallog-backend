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

export const UserService = {
  createUser,
};
