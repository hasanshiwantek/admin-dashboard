"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { Loader } from "lucide-react";
import { orderTimeline } from "@/redux/slices/orderSlice";

export default function OrderTimelinePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(orderTimeline({ orderId: id })).then((res: any) => {
        setOrderData(res.payload?.data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="animate-spin mr-2" /> Loading timeline...
      </div>
    );
  }

  const { order } = orderData || {};
  console.log("Order Timeline data: ", order);

  // ✅ CORRECTED: Build timeline from actual order data
  const timelineEvents = [];

  // 1. Order Created Event
  if (order?.createdAt) {
    timelineEvents.push({
      time: order.createdAt,
      title: "Order created",
      description: `Order Number: ${order.orderNumber}\nStatus: ${
        order.isDraft ? "Draft" : order.status
      }`,
    });
  }

  // 2. Payment Method Event
  if (order?.billingInformation?.paymentMethod) {
    timelineEvents.push({
      time: order.billingInformation.createdAt || order.createdAt,
      title: "Payment method selected",
      description: `Payment Method: ${
        order.billingInformation.paymentMethod === "credit_card"
          ? "Credit Card"
          : order.billingInformation.paymentMethod
      }`,
    });
  }

  // 3. Shipping Method Event
  if (order?.billingInformation?.shippingMethod) {
    timelineEvents.push({
      time: order.billingInformation.createdAt || order.createdAt,
      title: "Shipping method selected",
      description: `Shipping: ${order.billingInformation.shippingMethod
        .replace(/_/g, " ")
        .toUpperCase()}\nShipping Cost: $${order.shippingCost}`,
    });
  }

  // 4. Order Status Event
  if (order?.status) {
    timelineEvents.push({
      time: order.updatedAt || order.createdAt,
      title: "Order status",
      description: `Current Status: ${order.status}`,
    });
  }

  // 5. Shipping Event (if shipped)
  if (order?.shippedAt) {
    timelineEvents.push({
      time: order.shippedAt,
      title: "Order shipped",
      description: `Carrier: ${order.carrierName || "N/A"}\nTracking Number: ${
        order.trackingNumber || "N/A"
      }`,
    });
  }

  // 6. Notes Events
  if (order?.notes && order.notes.length > 0) {
    order.notes.forEach((note: any) => {
      timelineEvents.push({
        time: note.createdAt || order.createdAt,
        title: "Note added",
        description: note.content || note.text,
      });
    });
  }

  // 7. Staff Notes Event
  if (order?.staffNotes) {
    timelineEvents.push({
      time: order.updatedAt || order.createdAt,
      title: "Staff note added",
      description: order.staffNotes,
    });
  }

  // 8. Comments Event
  if (order?.comments) {
    timelineEvents.push({
      time: order.updatedAt || order.createdAt,
      title: "Customer comment",
      description: order.comments,
    });
  }

  // Sort events by time (newest first or oldest first - your choice)
  timelineEvents.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  return (
    <div className="p-10">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Order timeline -{" "}
          <span className="text-blue-600">Order #{order?.orderNumber}</span>
        </h1>
        <Separator className="mb-6" />

        {timelineEvents.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No timeline events available
          </div>
        ) : (
          <div className="relative border-l border-gray-300 pl-6 space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                <div className="absolute left-[-13px] top-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-full" />
                <span className="text-lg text-gray-500 mb-1">
                  {dayjs(event.time).format("MMMM D, YYYY h:mm A")}
                </span>
                <Card className="bg-white">
                  <CardContent className="py-4">
                    <h2 className="font-semibold text-lg mb-1">
                      {event.title}
                    </h2>
                    {event.description && (
                      <p className="text-lg whitespace-pre-line text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
