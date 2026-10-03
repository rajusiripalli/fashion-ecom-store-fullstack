"use server";

import { prisma } from "@/database/db";

export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            name: true,
          },
        },

        _count: {
          select: {
            items: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,

      customer: order.user.name ?? "Unknown Customer",

      totalItems: order._count.items,

      total: Number(order.total),

      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      status: order.status,

      createdAt: order.createdAt,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}