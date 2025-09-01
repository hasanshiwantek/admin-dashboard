// Remove "use client"
import OrderForm from "@/app/components/orders/add/forms/OrderForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderForm orderId={id} />;
}
