"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/database/db";
import { EditProfileFormValues } from "@/components/user/EditProfileForm";
import { getCurrentUser } from "@/server-actions/auth/getCurrentUser";

export async function updateProfile(data: EditProfileFormValues) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    await prisma.$transaction(async (tx) => {
      // Update user
      await tx.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          name: data.name,
          phone: data.phone,
        },
      });

      // Find default address
      const defaultAddress = await tx.address.findFirst({
        where: {
          userId: currentUser.id,
          isDefault: true,
        },
      });

      if (defaultAddress) {
        // Update existing address
        await tx.address.update({
          where: {
            id: defaultAddress.id,
          },
          data: {
            firstName: data.firstname,
            lastName: data.lastname,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postalCode,
          },
        });
      } else {
        // Create default address if none exists
        await tx.address.create({
          data: {
            firstName: data.firstname,
            lastName: data.lastname,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postalCode,
            isDefault: true,
            userId: currentUser.id,
          },
        });
      }
    });

    revalidatePath("/account");
    revalidatePath("/account/edit");

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    console.error("Failed to update profile:", error);

    return {
      success: false,
      message: "Failed to update profile.",
    };
  }
}