"use client";

import FrontendLayout from "@/components/layouts/FrontendLayout";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";

const cartItems = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        image: "/images/product1.png",
        price: 79.99,
        quantity: 1,
        size: "M",
        color: "Charcoal",
    },
    {
        id: 2,
        name: "Premium Hoodie",
        image: "/images/product2.png",
        price: 59.99,
        quantity: 2,
        size: "L",
        color: "Brown",
    }
]


export default function CartPage() {
    const router = useRouter();
    const totalItems = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const shipping = 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

   if (totalItems === 0) {
    return (
      <FrontendLayout>
        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface">
            <IoBagHandleOutline size={48} className="text-muted-foreground" />
          </div>

          <h1 className="mt-8 text-3xl font-bold">Your cart is empty</h1>

          <p className="mt-3 max-w-md text-muted-foreground">
            You haven&apos;t added any products to your cart yet. Browse our latest
            collection and start shopping.
          </p>

          <Link href="/shop" className="mt-8">
            <Button>Continue Shopping</Button>
          </Link>
        </section>
      </FrontendLayout>
    );
  }


  return (
       <FrontendLayout>
      <section className="mx-auto max-w-6xl py-12">
        {/* Header */}
        <div>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
          />

          <p className="mt-2 text-muted-foreground">
            {totalItems} Item{totalItems !== 1 && "s"}  in your cart
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Left */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                //key={item.cartKey}
                className="flex flex-col gap-5 rounded-2xl border border-border p-5 transition hover:shadow-sm sm:flex-row"
              >
                {/* Product Image */}
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={180}
                    className="h-70 lg:h-44 w-full object-cover sm:w-36"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-full bg-surface px-3 py-1">
                        Size: {item.size}
                      </span>

                      <span className="rounded-full bg-surface px-3 py-1">
                        Color: {item.color}
                      </span>
                    </div>

                    <p className="mt-5 text-2xl font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        //onClick={() => decreaseQuantity(item.cartKey)}
                        className="p-3 transition hover:bg-surface"
                      >
                        <FiMinus />
                      </button>

                      <span className="min-w-12 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        //onClick={() => increaseQuantity(item.cartKey)}
                        className="p-3 transition hover:bg-surface"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      //onClick={() => removeFromCart(item.cartKey)}
                      className="flex items-center gap-2 text-destructive transition hover:opacity-80"
                    >
                      <FiTrash2 />
                      <span className="text-sm font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <aside className="h-fit rounded-2xl border border-border p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-8 space-y-5">
              <div className="flex justify-between text-muted-foreground">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{ "Free" }</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-border pt-5">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              //onClick={() => Router.push("/checkout")}
              fullWidth
              className="mt-8"
            >
              Proceed to Checkout
            </Button>

            <Link
              href="/shop"
              className="mt-5 block text-center text-sm font-medium text-primary hover:underline"
            >
              Continue Shopping
            </Link>

            <div className="mt-8 rounded-xl bg-surface p-4 text-sm text-muted-foreground">
              ✓ Free shipping on orders over $100
              <br />
              ✓ Secure payment with Stripe
              <br />✓ Easy 7-day returns
            </div>
          </aside>
        </div>
      </section>
    </FrontendLayout>
  )
}
