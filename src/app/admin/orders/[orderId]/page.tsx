import Image from "next/image";
import { notFound } from "next/navigation";


//import { getAdminOrder } from "@/server-actions/orders/getAdminOrder";
//import OrderStatusCard from "@/components/orders/orderStatusCard";

interface OrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

 const orders = [
    {
        id: "12345",
        name: "Classic Jean Jacket",
        image: "/images/product1.png",
        totalItems: 3,
        totalPrice: 259.97,
        date: "July 27, 2026",
        status: "Delivered",
        paymentStatus:"Piad",
    },
    {
        id: "123456",
        name: "Modern Stock Jeans",
        image: "/images/product2.png",
        totalItems: 1,
        totalPrice: 79.99,
        date: "July 21, 2026",
        status: "Processing",
        paymentStatus:"COD",
    }
]



export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { orderId } = await params;

  //const order = await getAdminOrder(Number(orderId));

//   if (!order) {
//     notFound();
//   }

  return (
    <section>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Order {"order.orderNumber"}
        </h1>

        <p className="mt-2 text-muted-foreground">
          Placed on{" "}
          {/* {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format("2026-09-25T15:30:00.000Z")} */}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* LEFT */}
        <div className="space-y-8">
          {/* Customer */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-lg font-semibold">
              Customer Information
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="mt-1 font-medium">
                  {"order.customer.name"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="mt-1 font-medium">
                  {"order.customer.email"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="mt-1 font-medium">
                  {"order.address.phone"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Address
                </p>

                <p className="mt-1 font-medium">
                  {"order.address.street"}
                  <br />
                  {"order.address.city"}, {"order.address.state"}
                  <br />
                  {"order.address.country"}
                </p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="rounded-2xl border border-border bg-background">
            <div className="border-b border-border p-6">
              <h2 className="text-lg font-semibold">
                Order Items
              </h2>
            </div>

            <div className="divide-y divide-border">
              {orders.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-5 p-6"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={90}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Size: {"item.size"}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Quantity: {"item.quantity"}
                    </p>
                  </div>

                  <div className="font-semibold">
                    {/* ${(Number(item.price) * item.quantity).toFixed(2)} */}
                    2000
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          {/* Status */}
          {/* <OrderStatusCard orderId={order.id} status={order.status}/> */}

          {/* Summary */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-lg font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span>${Number("order.subtotal").toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Shipping
                </span>

                <span>${Number("order.shipping").toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Tax
                </span>

                <span>${Number("order.tax").toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t border-border pt-4 text-lg font-semibold">
                <span>Total</span>

                <span>${Number("order.total").toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-lg font-semibold">
              Payment
            </h2>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-muted-foreground">
                Method
              </span>

              <span>{"order.paymentMethod"}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-muted-foreground">
                Status
              </span>

              <span>{"order.paymentStatus"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}