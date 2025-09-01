"use client";
import OrderForm from "@/app/components/orders/add/forms/OrderForm";
export default function page({ params }: { params: { id: any } }) {
  return <OrderForm orderId={params.id} />;
}
