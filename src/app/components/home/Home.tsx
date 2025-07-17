import React from "react";
import SetupProgress from "./SetupProgress";
import Stats from "./Stats";
import OrderTable from "./OrderTable";
import StorePerformanceChart from "./StorePerfomance";

const Home = () => {
  return (
    <>
      <div className=" p-10  bg-[var(--store-bg)]">
        <main className="flex flex-col gap-5">
          <SetupProgress />
          <StorePerformanceChart />
          <Stats />
          <OrderTable/>
        </main>
      </div>
    </>
  );
};

export default Home;
