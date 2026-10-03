import OrderPageComponent from "@/components/orders/OrderPageComponent";
import { getOrder } from "@/server-actions/orders/getOrder";
import { notFound } from "next/navigation";

interface OrderPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;

  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  return <OrderPageComponent order={order} />;
}
