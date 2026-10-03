"use server";

import { prisma } from "@/database/db";
import { OrderStatus } from "@/generated/prisma/enums";

interface UpdateOrderStatusInput {
  orderId: number;
  status: OrderStatus;
}

export async function updateOrderStatus({
  orderId,
  status,
}: UpdateOrderStatusInput) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return {
        success: false,
        message: "Order not found.",
      };
    }

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return {
      success: true,
      message: "Order status updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to update order status.",
    };
  }
}