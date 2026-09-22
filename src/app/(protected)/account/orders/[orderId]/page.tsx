import FrontendLayout from "@/components/layouts/FrontendLayout";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const order = {
  id: "ORD-8FK2P9",
  createdAt: "July 27, 2026",
  status: "PENDING",
  paymentMethod: "Cash on Delivery",
  paymentStatus: "Pending",
  subtotal: 199.97,
  shipping: 0,
  tax: 10,
  total: 209.97,
  address: {
    firstname: "John",
    lastName: "Doe",
    phone: "+23465778",
    city: "Lekki",
    state: "Lagos",
    country: "Nigeria",
  },
  items: [
    {
      id: 1,
      name: "Classic Denim Jacket",
      image: "/image/product1.png",
      price: 79.99,
      quantity: 1,
      size: "M",
      color: "Black",
    },
    {
      id: "2",
      name: "Premium Hoodie",
      image: "/image/product2.png",
      price: 59.99,
      quantity: 2,
      size: "L",
      color: "Brown",
    },
  ],
};
export default function OrderPage() {
  return (
     <FrontendLayout>
      <section className="mx-auto max-w-7xl py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Orders", href: "/account/orders" },
            { label: order.id },
          ]}
        />

          {/* Header */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/account/orders">
              <Button
              variant="outline"
              leftIcon={<FiArrowLeft />}
              className="mb-5"
            >
              Back to Orders
            </Button>
            </Link>
          

            <h1 className="text-3xl font-bold">{order.id}</h1>

            <p className="mt-2 text-muted-foreground">
                Placed on {"order.createdAt.toLocaleDateString()"}
            </p>
          </div>

        
            <OrderStatusBadge />
      
        </div>

        </section>

    </FrontendLayout>
  )
}
