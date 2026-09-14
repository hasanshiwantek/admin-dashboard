"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllOrders, fetchDashboardOrderOverview, } from "@/redux/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { OrderItem, OrderListResponse } from "@/types/types";
import Spinner from "../loader/Spinner";
const tabs = [{ tab: "Recent", queryIndex: 0 }, { tab: "Pending", queryIndex: 1 }, { tab: "Completed", queryIndex: 2 }, { tab: "Refunded", queryIndex: 3 }];
const query = [
  "recent",      // Recent
  "pending",     // Pending
  "completed",   // Completed
  "refunded",    // Refunded
];


const OrderTable = () => {
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.order);
  const dashboardOrders = useAppSelector(
    (state: any) => state?.order?.dashboardOrders
  );

  const dashboardOrdersLoading = useAppSelector(

    (state: any) => state?.order?.dashboardOrdersLoading
  );
  const filteredOrders = dashboardOrders?.data || [];
  const [activeTab, setActiveTab] = useState("0");
  // const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>([]);

  // Fetch all orders on mount

  useEffect(() => {
    dispatch(
      fetchDashboardOrderOverview({
        page: 1,
        perPage: 20,
        status: query[Number(activeTab)],
      })
    );
  }, [activeTab, dispatch]);


  return (
    <div>
      <h1 className="my-5 !text-[2.4rem]">Orders</h1>

      <div className="bg-white rounded shadow-sm p-4 mb-10">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(tab.queryIndex.toString())}
                className={`text-xl lg:text-2xl px-6 py-2 rounded-full transition cursor-pointer ${activeTab === tab.queryIndex.toString()
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                {tab.tab}
              </button>
            ))}
          </div>
          <Link
            href="/manage/orders"
            className="!text-xl lg:text-2xl text-blue-500 hover:underline"
          >
            View more &rarr;
          </Link>
        </div>

        {/* Loading Spinner */}
        {dashboardOrdersLoading ? (
          <div className="text-center py-10">
            <Spinner />
          </div>
        ) : <div className="divide-y">
          {filteredOrders.length === 0 && (
            <p className="text-center  py-10">
              No orders found for <strong>{activeTab}</strong>.
            </p>
          )}

          {filteredOrders.map((order: any) => {
            const colorMap: Record<string, string> = {
              Pending: "bg-[#879193]",
              "Awaiting Payment": "bg-[#ff9000]",
              "Awaiting Fulfillment": "bg-[#72cdfa]",
              "Awaiting Shipment": "bg-[#cd3101]",
              "Awaiting Pickup": "bg-[#c979f2]",
              "Partially Shipped": "bg-[#4a6fb3]",
              Completed: "bg-[#BDDF57]",
              Shipped: "bg-[#BDDF57]",
              Cancelled: "bg-[#000000]",
              Declined: "bg-[#7F5F3C]",
              Refunded: "bg-[#FCCB05]",
              Disputed: "bg-[#9966FF]",
              "Manual Verification Required": "bg-[#E7A0AE]",
              "Partially Refunded": "bg-[#FCCB05]",
            };

            const color = colorMap[order.status] || "bg-gray-400";

            const formattedDate = new Date(order.createdAt).toLocaleString(
              "en-US",
              {
                dateStyle: "medium",
                timeStyle: "short",
              }
            );

            return (
              <div
                key={order.id}
                className="flex items-center justify-between py-4 hover:bg-[#f1f8fe]"
              >
                <div className="flex items-center gap-4 w-1/3">
                  <span className={`w-4 h-6 ${color}`}></span>
                  <span className="!text-xl lg:!text-2xl font-medium text-[#5d5b66]">
                    {order.status}
                  </span>
                </div>
                <Link href={`/manage/orders?orderIdFrom=${order?.id}&orderIdTo=${order?.id}`}>
                  <div className=" text-xl lg:text-2xl text-blue-600 hover:underline cursor-pointer">
                    Order #{order.id} - {order.billingInformation?.firstName}{" "}
                    {order.billingInformation?.lastName}
                  </div>
                </Link>
                <div className="w-1/3 flex justify-between text-right text-gray-700">
                  <div className="font-semibold text-xl lg:text-2xl text-gray-500">
                    ${parseFloat(order.totalAmount).toFixed(2)}
                  </div>
                  <div className="text-xl lg:text-2xl text-gray-500">
                    {formattedDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>}

        {/* Error Message */}
        {!dashboardOrdersLoading && error && (
          <div className="text-center py-10 text-red-500 text-lg">
            Error: {error}
          </div>
        )}


      </div>
    </div>
  );
};

export default OrderTable;

