import React from "react";

const stats = [
  { label: "Orders", value: "407" },
  { label: "Customers", value: "142" },
  { label: "Products", value: "275,215" },
  { label: "Categories", value: "255" },
];

const Stats = () => {
  return (
    <div className="bg-[#f7f8fa]  rounded-md">
      <h1 className=" my-5">
        Store statistics
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border rounded bg-white overflow-hidden">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`group py-6 px-4 text-center hover:bg-[#f1f8fe] cursor-pointer ${
              index < stats.length - 1 ? "border-r" : ""
            }`}
          >
            <div className="text-[2rem] font-light text-gray-600 group-hover:text-[#4b71fc]">
              {item.value}
            </div>
            <div className="text-lg text-gray-600 mt-1 group-hover:text-[#4b71fc]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
