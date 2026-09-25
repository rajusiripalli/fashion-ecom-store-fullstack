"use client";

import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { deleteProduct } from "@/server-actions/products/deleteProduct";

interface DeleteProductButtonProps {
  productId: string;
}

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const result = await deleteProduct(productId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      disabled={isDeleting}
      onClick={handleDelete}
      className="rounded-lg p-2 text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : <FiTrash2 />}
    </button>
  );
}
