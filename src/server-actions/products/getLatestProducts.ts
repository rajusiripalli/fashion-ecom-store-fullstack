"use server";

import { prisma } from "@/database/db";

export async function getLatestProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        images: {
          take: 1,
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  } catch (error) {
    console.error("Failed to fetch latest products:", error);

    return [];
  }
}