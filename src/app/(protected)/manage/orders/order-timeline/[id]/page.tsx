"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import { Loader, ArrowRight, Percent } from "lucide-react";
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

  const timelineEvents = orderData?.timeline || [];
  const orderNumber = orderData?.order_number;

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {/* ================= PAGE HEADER ================= */}
      <div className="h-[75px] bg-white border-t-[3px] border-[#060a3e] border-b border-[#d9d9d9] flex items-center px-[40px]">
        <div className="flex items-center gap-[16px]">
          <span className="!text-[16px] !font-normal">
            Orders
          </span>

          <span className="!text-[29px] leading-none ] font-light">
            ›
          </span>

          <h1 className="m-0 !text-[30px] leading-[36px] !font-light ">
            Order timeline -{" "}
            <span className="!text-[#4d70ff] !font-normal !text-[30px]">
              Order #{orderNumber}
            </span>
          </h1>
        </div>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="px-[10px] pt-[59px] pb-[40px]">
        {timelineEvents.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No timeline events available
          </div>
        ) : (
          <div className="relative max-w-[1375px] mx-auto">
            {/* Main vertical timeline line */}
            <div
              className="
                absolute
                left-[312px]
                top-0
                bottom-0
                w-[2px]
                bg-[#d3d3d3]
              "
            />

            <div className="space-y-[29px]">
              {timelineEvents.map((event: any, index: any) => {
                const isTaxEvent =
                  event.title?.toLowerCase().includes("tax");

                return (
                  <div
                    key={index}
                    className="
                      relative
                      grid
                      grid-cols-[312px_minmax(0,1fr)]
                      gap-[35px]
                      min-h-[171px]
                    "
                  >
                    {/* ================= DATE / TIME ================= */}
                    <div
                      className="
                        flex
                        flex-col
                        justify-center
                        items-end
                        pr-[38px]
                        text-right
                      "
                    >
                      <span
                        className="
                          !text-[16px]
                          leading-[24px]
                          uppercase
                          text-[#18375d]
                          !font-normal
                        "
                      >
                        {event.date}
                      </span>

                      <span
                        className="
                          !text-[16px]
                          leading-[26px]
                          text-[#18375d]
                          !font-normal
                        "
                      >
                        {event.time}
                      </span>
                    </div>

                    {/* ================= TIMELINE ICON ================= */}
                    <div
                      className="
                        absolute
                        left-[297px]
                        top-1/2
                        -translate-y-1/2
                        z-10
                        w-[32px]
                        h-[32px]
                        rounded-full
                        bg-white
                        border
                        border-[#e3e5e8]
                        shadow-[0_1px_5px_rgba(0,0,0,0.10)]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      {isTaxEvent ? (
                        <Percent
                          size={16}
                          strokeWidth={1.5}
                          className="text-[#4d70ff]"
                        />
                      ) : (
                        <ArrowRight
                          size={18}
                          strokeWidth={1.5}
                          className="text-[#4d70ff]"
                        />
                      )}
                    </div>

                    {/* ================= EVENT CARD ================= */}
                    <Card
                      className="
                        rounded-none
                        border
                        border-[#e2e2e2]
                        bg-white
                        shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                        min-h-[171px]
                      "
                    >
                      <CardContent className="px-[51px] py-[42px]">
                        <h2
                          className="
                            m-0
                            mb-[5px]
                            !text-[17px]
                            leading-[25px]
                            font-semibold
                            text-[#18375d]
                          "
                        >
                          {event.title}
                        </h2>

                        {event.details &&
                          !Array.isArray(event.details) &&
                          Object.entries(event.details).map(
                            ([key, value]) => (
                              <p
                                key={key}
                                className="
                                  m-0
                                  !text-[16px]
                                  leading-[29px]
                                  whitespace-pre-line
                                  text-[#18375d]
                                  font-normal
                                "
                              >
                                <span className="font-medium">
                                  {key
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (c) =>
                                      c.toUpperCase()
                                    )}
                                  :
                                </span>{" "}
                                {String(value)}
                              </p>
                            )
                          )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}