/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderedBooks } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

type IUserData = {
  userId: string;
  role: string;
};

const createOrder = async (data: {
  orderedBooks: OrderedBooks[];
  userId: string;
}): Promise<any> => {
  const { orderedBooks, ...orderData } = data;

  const result = await prisma.$transaction(async tx => {
    const orderCreated = await tx.order.create({
      data: orderData,
    });

    if (!orderCreated?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    for (let i = 0; i < orderedBooks.length; i++) {
      const orderedBooksCreated = await tx.orderedBooks.create({
        data: {
          quantity: orderedBooks[i].quantity,
          bookId: orderedBooks[i].bookId,
          orderId: orderCreated.id,
        },
      });
      console.log({ orderedBooksCreated });
    }
    return orderCreated;
  });

  if (!result.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
  }

  return await prisma.order.findFirst({
    where: {
      id: result.id,
    },
    include: {
      orderedBooks: true,
    },
  });
};

const getAllOrder = async (userData: IUserData): Promise<Order[] | null> => {
  if (userData.role === 'admin') {
    const result = await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });
    return result;
  }

  const result = await prisma.order.findMany({
    where: {
      userId: userData.userId,
    },
  });

  return result;
};

const getSingleOrder = async (
  id: string,
  userData: IUserData
): Promise<Order | null> => {
  if (userData.role === 'admin') {
    const result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    return result;
  }

  const result = await prisma.order.findFirst({
    where: {
      id,
      userId: userData.userId,
    },
  });

  return result;
};

const updateOrder = async (
  id: string,
  data: Partial<Order>,
  userData: IUserData
): Promise<Order | null> => {
  if (userData.role === 'admin') {
    const result = await prisma.order.update({
      where: {
        id,
      },
      data,
    });
    return result;
  }

  const isExistUser = await prisma.order.findFirst({
    where: {
      id,
      userId: userData.userId,
    },
  });

  if (!isExistUser?.id) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You can not update this order!'
    );
  }

  const result = await prisma.order.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteOrder = async (id: string, userData: IUserData): Promise<Order> => {
  if (userData.role === 'admin') {
    const result = await prisma.order.delete({
      where: {
        id,
      },
    });
    return result;
  }

  const isExistUser = await prisma.order.findFirst({
    where: {
      id,
      userId: userData.userId,
    },
  });

  if (!isExistUser?.id) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You can not deleted this order!'
    );
  }

  const result = await prisma.order.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
