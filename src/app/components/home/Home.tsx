import React from "react";
import SetupProgress from "./SetupProgress";
import Stats from "./Stats";
import OrderTable from "./OrderTable";
const Home = () => {
  return (
    <>
      <div className=" p-10  bg-[#f6f7f9]">
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
