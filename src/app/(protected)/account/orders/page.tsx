import Image from "next/image";
import Link from "next/link";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import { FiEye } from "react-icons/fi";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";


const orders = [
    {
        id: "12345",
        image: "/images/product1.png",
        totalItems: 3,
        totalPrice: 259.97,
        date: "July 27, 2026",
        status: "Delivered",
    },
    {
        id: "123456",
        image: "/images/product2.png",
        totalItems: 1,
        totalPrice: 79.99,
        date: "July 21, 2026",
        status: "Processing",
    }
]

export default function OrdersPage() {
  return (
    <FrontendLayout>
        <section className="mx-auto max-w-6xl py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Orders" },
          ]}
        />
        <p className="mt-2 text-muted-foreground">
          View and track your recent purchases.
        </p>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border py-16 text-center">
            <h2 className="text-xl font-semibold">No orders yet</h2>

            <p className="mt-2 text-muted-foreground">
              You haven&apos;t placed any orders yet.
            </p>

            <Link href="/shop">
              <Button className="mt-6">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-6 rounded-2xl border border-border p-5 transition hover:shadow-sm md:flex-row md:items-center"
              >
                <Image
                  src={order.image}
                  alt={order.orderNumber}
                  width={110}
                  height={130}
                  className="rounded-xl object-cover"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold">
                      Order #{"order.orderNumber"}
                    </h2>

                   <OrderStatusBadge />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-5 text-sm md:grid-cols-3">
                    <div>
                      <p className="text-muted-foreground">Total Items</p>

                      <p className="mt-1 font-semibold">
                        {order.totalItems}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Total Price</p>

                      <p className="mt-1 font-semibold">
                        ${"order.total.toFixed(2)"}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Order Date</p>

                      {/* <p className="mt-1 font-semibold">
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                        }).format(order.createdAt)}
                      </p> */}
                    </div>
                  </div>
                </div>

                <Link href={`/account/orders/${order.id}`}>
               
                        <button className="rounded-lg p-4 transition bg-surface cursor-pointer">
                          <FiEye />
                        </button>
                </Link>
                
              </div>
            ))}
          </div>
        )}
      </section>
    </FrontendLayout>
  );
}