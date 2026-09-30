"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/database/db";
import { requireAdmin } from "../auth/require-auth";

export async function deleteProduct(productId: string) {
  try {
    await requireAdmin();

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    // Delete all images from Cloudinary
    await Promise.all(
      product.images.map((image) =>
        cloudinary.uploader.destroy(image.publicId)
      )
    );

    // Delete the product (related images, sizes, and colors
    // will be deleted automatically because of Cascade)
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  } catch (error) {
    console.error("Failed to delete product:", error);

    return {
      success: false,
      message: "Failed to delete product.",
    };
  }
}