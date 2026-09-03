"use client";

import React, { useState } from "react";
import Header from "./Header";
import { SideBar } from "./Sidebar";
import NavigationLoader from "../loader/NavigationLoader";
import { createPortal } from "react-dom";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">

        <Header onMenuClick={() => setSidebarOpen(true)} />

        <NavigationLoader />

      <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
<aside 
  onMouseEnter={() => {
    if (isCollapsed) {
      setIsHovered(true);
    }
  }}
  onMouseLeave={() => {
    if (isCollapsed) {
      setIsHovered(false);
    }          
  }}
  className={`hidden md:block shrink-0  overflow-y-auto border-r bg-white transition-[width] duration-200 ease-in-out ${
    isCollapsed
      ? isHovered
        ? "w-[26.8rem]"
        : "w-[4.3rem]"
      : "w-[26.8rem]"
  }`}
>
  <SideBar
    isCollapsed={isCollapsed}
    setIsCollapsed={setIsCollapsed}
    isHovered={isHovered}
     setIsHovered={setIsHovered}
  />
</aside>

          {/* Main Content */}
       <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[var(--store-bg)] mt-20">
            {children}
          </main>

        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="fixed top-0 left-0 h-full w-[26.8rem] z-50 bg-white border-r overflow-y-auto animate-in slide-in-from-left">
              <SideBar onClose={() => setSidebarOpen(false)} />
            </aside>
          </>,
          document.body
        )}
    </>
  );
};

export default LayoutWrapper;