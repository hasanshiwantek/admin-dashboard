"use client";

import OrderBillingDetails from "./OrderBillingDetails";
import OrderItemsSummary from "./OrderItemsSummary";
import OrderShippingDetails from "./OrderShippingDetails";
import { OrderDetailRowProps } from "./types";

export default function OrderDetailRow({
  order,
  onCaptureFunds,
  onViewShipmentId,
  onShipItems,
}: OrderDetailRowProps) {
  return (
    <div className="grid grid-cols-3 gap-8 bg-soft-ivory-white p-6">
      <OrderBillingDetails order={order} onCaptureFunds={onCaptureFunds} />
      <OrderShippingDetails order={order} />
      <OrderItemsSummary
        order={order}
        onViewShipmentId={onViewShipmentId}
        onShipItems={onShipItems}
      />
    </div>
  );
}
