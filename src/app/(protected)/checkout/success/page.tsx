"use client";

import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import { getOrderByStripeSessionId } from "@/server-actions/orders/getOrderByStripeSessionId";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

export default function CheckoutSuccessPageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();

  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      router.replace("/");
      return;
    }

    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      const order = await getOrderByStripeSessionId(sessionId);

      if (order) {
        clearInterval(interval);
        toast.success("Order placed successfully.");
        clearCart();
        router.replace(`/account/orders/${order.orderNumber}`);
        return;
      }

      if (attempts >= 10) {
        clearInterval(interval);
        setTimedOut(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router, searchParams,clearCart]);

  if (timedOut) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-lg rounded-2xl border border-border p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <FiCheckCircle className="text-3xl text-green-600" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">Payment Received</h1>

          <p className="mt-4 text-muted-foreground">
            Your payment was successful, but we&apos;re still finalizing your order.
            This usually only takes a few more seconds.
          </p>

          <Button className="mt-8" onClick={() => window.location.reload()}>
            Check Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-lg rounded-2xl border border-border p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">Finalizing Your Order</h1>

        <p className="mt-4 text-muted-foreground">
          Your payment was successful. Please wait while we confirm your order
          and prepare your receipt.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          You&apos;ll be redirected automatically.
        </p>
      </div>
    </section>
  );
}
