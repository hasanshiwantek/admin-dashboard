import React from "react";
import Header from "./Header";
import { SideBar } from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default LayoutWrapper;
