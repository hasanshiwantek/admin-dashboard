import React from "react";
import AnnouncementBanner from "@/app/components/orders/add/AnnouncementBanner";
import OrderForm from "@/app/components/orders/add/forms/OrderForm";
const page = () => {
  return (
    <div>
      <h1 className="!text-5xl px-10 py-4 !font-extralight !text-gray-600 !my-5 ">
        Add an order
      </h1>
      <OrderForm orderId="" />
    </div>
  );
};


export default page;
