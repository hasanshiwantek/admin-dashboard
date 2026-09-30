import OrderTable from "./OrderTable";
import SetupProgress from "./SetupProgress";
import Stats from "./Stats";
import StorePerformanceChart from "./StorePerfomance";

const Home = () => {
  return (
    <>
      <div className=" p-10  ">
        <main className="flex flex-col gap-5">
          <SetupProgress />
          <StorePerformanceChart />
          <Stats />
          <OrderTable />
        </main>
      </div>
    </>
  );
};

export default Home;
