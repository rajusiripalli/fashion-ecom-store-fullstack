"use server";

import { prisma } from "@/database/db";

export async function getOrderByStripeSessionId(
  stripeSessionId: string,
) {
  return prisma.order.findUnique({
    where: {
      stripeSessionId,
    },
    select: {
      id: true,
      orderNumber:true
    },
  });
}