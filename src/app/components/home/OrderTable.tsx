import React from "react";

const orders = [
  {
    status: "Awaiting Payment",
    color: "bg-orange-500",
    orderId: "#310692",
    name: "IT Department",
    price: "$429.50",
    date: "Jul 15, 2025, 6:56 AM",
  },
  {
    status: "Awaiting Payment",
    color: "bg-orange-500",
    orderId: "#310691",
    name: "Michael Sikora",
    price: "$442.34",
    date: "Jul 14, 2025, 12:42 PM",
  },
  {
    status: "Awaiting Fulfillment",
    color: "bg-sky-400",
    orderId: "#310689",
    name: "Catherine Thompson Floyd",
    price: "$428.83",
    date: "Jul 14, 2025, 10:53 AM",
  },
  {
    status: "Awaiting Fulfillment",
    color: "bg-sky-400",
    orderId: "#310688",
    name: "Cheryl Sung",
    price: "$108.00",
    date: "Jul 14, 2025, 1:02 AM",
  },
  {
    status: "Awaiting Payment",
    color: "bg-orange-500",
    orderId: "#310687",
    name: "Jeanette Becker",
    price: "$373.92",
    date: "Jul 13, 2025, 5:12 PM",
  },
  {
    status: "Awaiting Fulfillment",
    color: "bg-sky-400",
    orderId: "#310686",
    name: "Tommy Molina",
    price: "$244.90",
    date: "Jul 10, 2025, 1:03 PM",
  },
  {
    status: "Shipped",
    color: "bg-green-400",
    orderId: "#310685",
    name: "Brian Bell",
    price: "$2,558.17",
    date: "Jul 10, 2025, 11:12 AM",
  },
  {
    status: "Shipped",
    color: "bg-green-400",
    orderId: "#310684",
    name: "Beverly Bilbro",
    price: "$755.09",
    date: "Jul 10, 2025, 9:18 AM",
  },
  {
    status: "Shipped",
    color: "bg-green-400",
    orderId: "#310683",
    name: "Jason McAninch",
    price: "$373.92",
    date: "Jul 9, 2025, 1:15 PM",
  },
  {
    status: "Awaiting Fulfillment",
    color: "bg-sky-400",
    orderId: "#310682",
    name: "Josiah hemphill",
    price: "$287.50",
    date: "Jul 9, 2025, 10:26 AM",
  },
];

const tabs = ["Recent", "Pending", "Completed", "Refunded"];

const OrderTable = () => {
  return (
    <div>
      <h1 className="my-5">Orders</h1>

      <div className="bg-white rounded shadow-sm p-4">
        {/* Tabs and Header Row */}
        <div className="flex justify-between items-center mb-4">
          {/* Tabs */}
          <div className="flex space-x-4">
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`text-2xl px-6 py-2 rounded-full transition ${
                  i === 0
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* View More */}
          <a href="#" className="!text-xl text-blue-500 hover:underline">
            View more &rarr;
          </a>
        </div>

        {/* Orders Table */}
        <div className="divide-y">
          {orders.map((order, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 hover:bg-[#f1f8fe]"
            >
              {/* Status + Color */}
              <div className="flex items-center gap-4 w-1/3">
                <span className={`w-4 h-6  ${order.color}`}></span>
                <span className="!text-2xl !font-[400] text-[#5d5b66]">{order.status}</span>
              </div>

              {/* Order Info */}
              <div className="w-1/3 text-xl text-blue-600 hover:underline cursor-pointer">
                Order {order.orderId} - {order.name}
              </div>

              {/* Price + Date */}
              <div className="w-1/3 flex justify-between  text-right  text-gray-700">
                <div className="font-semibold text-xl text-gray-500">{order.price}</div>
                <div className="text-xl text-gray-500">{order.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
