import Link from "next/link";
import { FiEye } from "react-icons/fi";

//import { getAllOrders } from "@/server-actions/orders/getAllOrders";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

 const orders = [
    {
        id: "12345",
        image: "/images/product1.png",
        totalItems: 3,
        totalPrice: 259.97,
        date: "July 27, 2026",
        status: "Delivered",
        paymentStatus:"Piad",
    },
    {
        id: "123456",
        image: "/images/product2.png",
        totalItems: 1,
        totalPrice: 79.99,
        date: "July 21, 2026",
        status: "Processing",
        paymentStatus:"COD",
    }
]

export default async function AdminOrdersPage() {


  return (
    <section>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>

        <p className="mt-2 text-muted-foreground">
          View and manage customer orders.
        </p>
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Order
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Items
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Total
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Payment
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-surface/50"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium">
                        {order.id}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {"order.createdAt.toLocaleDateString()"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {"order.customer"}
                  </td>

                  <td className="px-6 py-5">
                    {order.totalItems}
                  </td>

                  <td className="px-6 py-5 font-medium">
                    ${"order.total.toFixed(2)"}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                          : order.paymentStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                            : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                   <OrderStatusBadge status={order.status}/>
                  </td>

                  <td className="px-6 py-5">
                    {order.date}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/orders/${order.id}`}>
                        <button className="rounded-lg p-2 transition hover:bg-surface">
                          <FiEye />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}