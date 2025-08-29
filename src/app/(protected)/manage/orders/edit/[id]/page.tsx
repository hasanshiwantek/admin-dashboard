"use client";
import OrderForm from "@/app/components/orders/add/forms/OrderForm";
export default function page({ params }: { params: { id: string } }) {
  return <OrderForm orderId={params.id} />;
}
