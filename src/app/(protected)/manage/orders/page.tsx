import React from "react";
import styles from "@/styles/orders/Order.module.css";
import AllOrders from "@/app/components/orders/AllOrders";
const page = () => {
  return (
    <>
      <div >
        <div className="p-10">
          <h1 className="!text-5xl !font-extralight !text-gray-600 !my-10">View orders</h1>
          <AllOrders />
        </div>
      </div>
    </>
  );
};

export default page;
