"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllOrders } from "@/redux/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { OrderItem, OrderListResponse } from "@/types/types";
import Spinner from "../loader/Spinner";
const tabs = ["Recent", "Pending", "Completed", "Refunded"];

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const { loading, error, orders } = useAppSelector(
    (state) => state.order
  ) as unknown as {
    loading: boolean;
    error: string | null;
    orders: OrderListResponse;
  };

  console.log("Orders data from frontend: ", orders);

  const [activeTab, setActiveTab] = useState("Recent");
  const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>([]);

  // Fetch all orders on mount
  useEffect(() => {
    dispatch(fetchAllOrders({ page: 1, perPage: 50 }));
  }, [dispatch]);

  // Filter orders based on active tab
  useEffect(() => {
    if (!orders?.data) return;

    if (activeTab === "Recent") {
      setFilteredOrders(orders.data);
    } else {
      const filtered = orders.data.filter(
        (order) => order.status.toLowerCase() === activeTab.toLowerCase()
      );
      setFilteredOrders(filtered);
    }
  }, [activeTab, orders]);

  return (
    <div>
      <h1 className="my-5">Orders</h1>

      <div className="bg-white rounded shadow-sm p-4 mb-10">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(tab)}
                className={`text-xl px-6 py-2 rounded-full transition cursor-pointer ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Link
            href="/manage/orders"
            className="!text-xl text-blue-500 hover:underline"
          >
            View more &rarr;
          </Link>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-10">
            <Spinner />
          </div>
        )}

        {/* Error Message */}
        {!loading && error && (
          <div className="text-center py-10 text-red-500 text-lg">
            Error: {error}
          </div>
        )}

        {/* Orders */}
        <div className="divide-y">
          {filteredOrders.length === 0 && (
            <p className="text-center  py-10">
              No orders found for <strong>{activeTab}</strong>.
            </p>
          )}

          {filteredOrders.map((order) => {
            const colorMap: Record<string, string> = {
              Pending: "bg-gray-400",
              "Awaiting Payment": "bg-orange-400",
              "Awaiting Fulfillment": "bg-blue-300",
              "Awaiting Shipment": "bg-blue-500",
              "Awaiting Pickup": "bg-blue-600",
              "Partially Shipped": "bg-teal-400",
              Completed: "bg-green-600",
              Shipped: "bg-lime-500",
              Cancelled: "bg-black",
              Declined: "bg-red-600",
              Refunded: "bg-yellow-400",
              Disputed: "bg-pink-600",
              "Manual Verification Required": "bg-purple-400",
              "Partially Refunded": "bg-yellow-300",
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
                  <span className="text-2xl font-medium text-[#5d5b66]">
                    {order.status}
                  </span>
                </div>
                <div className="w-1/3 text-xl text-blue-600 hover:underline cursor-pointer">
                  Order #{order.id} - {order.name}
                </div>
                <div className="w-1/3 flex justify-between text-right text-gray-700">
                  <div className="font-semibold text-xl text-gray-500">
                    ${parseFloat(order.totalAmount).toFixed(2)}
                  </div>
                  <div className="text-xl text-gray-500">{formattedDate}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
