import React from "react";
import SetupProgress from "./SetupProgress";
import Stats from "./Stats";
import OrderTable from "./OrderTable";
const Home = () => {
  return (
    <>
      <div className=" p-10  bg-[#f6f7f9]">
        <h1 className="text-[#34313f] !text-3xl !font-medium my-5">
          Get Started Guides
        </h1>
        <main className="flex flex-col gap-5">
          <SetupProgress />
          <Stats />
          <OrderTable/>
        </main>
      </div>
    </>
  );
};

export default Home;
