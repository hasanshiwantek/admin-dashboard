import React from "react";
import styles from "@/styles/orders/Order.module.css";
import AllOrders from "@/app/components/orders/AllOrders";
const page = () => {
  return (
    <>
      <div className="p-10  ">
        <div>
          <h1 className="!text-5xl !font-extralight !text-gray-600 !my-5">View orders</h1>
          <AllOrders />
        </div>
      </div>
    </>
  );
};

export default page;
