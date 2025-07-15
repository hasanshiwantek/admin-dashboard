import React from "react";
import Header from "./Header";
import { SideBar } from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = () => {
  return (
    <>
      <div>
        <Header />
        <SideBar/>
      </div>
    </>
  );
};

export default LayoutWrapper;
