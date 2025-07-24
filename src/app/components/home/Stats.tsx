"use client";
import React, { useEffect } from "react";
import { fetchStoreStatistics } from "@/redux/slices/homeSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import Link from "next/link";
const Stats = () => {
  const { statistics, loading, error } = useAppSelector(
    (state: any) => state.home
  );
  const data=statistics?.data
  const dispatch = useAppDispatch();
  console.log("Stats Data from frontend: ", data);

  const stats = [
    { label: "Orders", value: data?.totalOrders, link: "/manage/orders" },
    {
      label: "Customers",
      value: data?.totalCustomers,
      link: "/manage/customers",
    },
    { label: "Products", value: data?.totalProducts, link: "/manage/products" },
    {
      label: "Categories",
      value: data?.totalCategories,
      link: "/manage/categories",
    },
  ];

  useEffect(() => {
    dispatch(fetchStoreStatistics());
  }, [dispatch]);

  return (
    <div className="bg-[#f7f8fa]  rounded-md">
      <h1 className=" my-5">Store statistics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border rounded bg-white overflow-hidden">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`group py-6 px-4 text-center hover:bg-[#f1f8fe] cursor-pointer ${
              index < stats.length - 1 ? "border-r" : ""
            }`}
          >
            <Link href={item.link}>
              <div className="text-[2rem] font-light text-gray-600 group-hover:text-[#4b71fc]">
                {item.value}
              </div>
              <div className="text-lg text-gray-600 mt-1 group-hover:text-[#4b71fc]">
                {item.label}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
