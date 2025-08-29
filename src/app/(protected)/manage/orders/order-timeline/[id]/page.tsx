"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
// import { fetchOrderById } from '@/lib/redux/actions/orderActions';
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
  console.log("Order Timeline data: ",order);
  
  const timelineEvents = [
    {
      time: order?.createdAt,
      title: "Order created",
      description: `Status: ${order?.isDraft ? "Incomplete" : order?.status}`,
    },
    {
      time: dayjs(order?.createdAt).add(5, "minute").toISOString(),
      title: "Order status changed",
      description: `Previous Status: Incomplete\nNew Status: Awaiting Payment`,
    },
    {
      time: dayjs(order?.createdAt).add(5, "minute").toISOString(),
      title: "Order confirmed",
    },
    {
      time: dayjs(order?.createdAt).add(5, "minute").toISOString(),
      title: "Sales tax charged",
      description: `Tax Total: £243.50\nTax Provider: Basic Tax`,
    },
    {
      time: dayjs(order?.createdAt).add(5, "minute").toISOString(),
      title: "Shipping quote persisted",
    },
    {
      time: dayjs(order?.createdAt).add(10, "hour").toISOString(),
      title: "Order status changed",
      description: `Previous Status: Awaiting Payment\nNew Status: Awaiting Fulfillment`,
    },
    {
      time: dayjs(order?.createdAt).add(10, "hour").toISOString(),
      title: "Capture request successfully processed",
      description: `Source: Credit Card (via Stripe)`,
    },
  ];

  return (
    <div className="p-10">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Order timeline -{" "}
          <span className="text-blue-600">Order #{order?.id}</span>
        </h1>
        <Separator className="mb-6" />

        <div className="relative border-l  border-gray-300 pl-6 space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative">
              <div className="absolute left-[-13px] top-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-full" />
              <span className="text-lg text-gray-500 mb-1">
                {dayjs(event.time).format("MMMM D, YYYY h:mm A")}
              </span>
              <Card className="bg-white">
                <CardContent className="py-4">
                  <h2 className="font-semibold text-lg mb-1">{event.title}</h2>
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
      </div>
    </div>
  );
}
