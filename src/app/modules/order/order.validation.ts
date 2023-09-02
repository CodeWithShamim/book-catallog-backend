import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required',
    }),
    orderedBooks: z.array(
      z.object({
        quantity: z.number(),
        bookId: z.string(),
      }),
      {
        required_error: 'Ordered books is required',
      }
    ),
  }),
});

const update = z.object({
  body: z.object({
    status: z
      .enum([...Object.values(OrderStatus)] as [string, ...string[]])
      .optional(),
    userId: z.string().optional(),
    orderedBooks: z
      .array(
        z.object({
          quantity: z.number(),
          bookId: z.string(),
        })
      )
      .optional(),
  }),
});

export const OrderZodValidation = {
  create,
  update,
};
