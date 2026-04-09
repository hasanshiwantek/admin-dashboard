import React from "react";
import styles from "@/styles/orders/Order.module.css";
import AllOrders from "@/app/components/orders/AllOrders";
const page = () => {
  const getDeviceType = () => {
    if (typeof window === "undefined") return "desktop";

    const userAgent = navigator.userAgent;

    if (/mobile/i.test(userAgent)) return "mobile";
    if (/tablet/i.test(userAgent)) return "tablet";

    return "desktop";
  };

  return (
    <>
      <div>
        <div className="p-10">
          <h1 className="!text-5xl !font-extralight !text-gray-600 !my-10">View orders</h1>
          <AllOrders />
        </div>
      </div>
    </>
  );
};

export default page;
