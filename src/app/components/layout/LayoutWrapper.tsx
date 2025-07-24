import React from "react";
import Header from "./Header";
import { SideBar } from "./Sidebar";
import NavigationLoader from "../loader/NavigationLoader";

interface LayoutWrapperProps {
  children: React.ReactNode;
}
 
const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <Header />
        <NavigationLoader />
 
        {/* Main body (Sidebar + Page Content) */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-[26.8rem] shrink-0 overflow-y-auto border-r bg-white">
            <SideBar />
          </aside>
 
          {/* Main content with scroll */}
          <main className="flex-1 overflow-y-auto bg-[var(--store-bg)] mt-20 ">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
 
export default LayoutWrapper;