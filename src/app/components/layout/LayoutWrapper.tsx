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
      <div className="flex h-[calc(100vh-5.5rem)] overflow-hidden">
        <div className="w-[26.8rem] shrink-0 h-full overflow-y-auto">
          <SideBar />
        </div>

        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </>
  );
};

export default LayoutWrapper;
