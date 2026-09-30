"use server";

import { prisma } from "@/database/db";
import { requireAdmin } from "../auth/require-auth";

export async function getProducts() {
  try {
    await requireAdmin();

    const products = await prisma.product.findMany({
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

    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return [];
  }
}