import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Order } from '@prisma/client';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await OrderService.createOrder(data);

  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully.',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user as never;
  const result = await OrderService.getAllOrder(userData);

  sendResponse<Order[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully.',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user as never;
  const result = await OrderService.getSingleOrder(
    req.params.orderId,
    userData
  );

  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order getched successfully.',
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user as never;
  const result = await OrderService.updateOrder(
    req.params.id,
    req.body,
    userData
  );

  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order updated successfully.',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user as never;
  const result = await OrderService.deleteOrder(req.params.id, userData);

  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order deleted successfully.',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
