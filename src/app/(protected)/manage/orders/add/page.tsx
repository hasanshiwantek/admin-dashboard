import React from "react";
import AnnouncementBanner from "@/app/components/orders/add/AnnouncementBanner";
import OrderForm from "@/app/components/orders/add/forms/OrderForm";
const page = () => {
  return (
    <div className="p-10">
      <h1 className="!text-5xl !font-extralight !text-gray-600 !my-5">
        Add an order
      </h1>
      <div className="  flex flex-col gap-5">
        <AnnouncementBanner />
        <OrderForm/>
      </div>
    </div>
  );
};

export default page;
