"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import { OrderStatus } from "@/generated/prisma/enums";
import { updateOrderStatus } from "@/server-actions/orders/updateOrderStatus";

interface OrderStatusCardProps {
  orderId: number;
  status: OrderStatus;
}

const orderStatuses: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

export default function OrderStatusCard({
  orderId,
  status,
}: OrderStatusCardProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus>(status);

  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    startTransition(async () => {
      const result = await updateOrderStatus({
        orderId,
        status: selectedStatus,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Order status updated.");
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <h2 className="text-lg font-semibold">
        Order Status
      </h2>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value as OrderStatus)
          }
          className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none focus:border-primary"
        >
          {orderStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <Button
        onClick={handleUpdate}
        disabled={isPending}
        className="mt-6 w-full"
      >
        {isPending ? "Updating..." : "Update Order"}
      </Button>
    </div>
  );
}