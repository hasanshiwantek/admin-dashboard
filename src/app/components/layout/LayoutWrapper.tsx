"use client";
import React, { useState } from "react";
import Header from "./Header";
import { SideBar } from "./Sidebar";
import NavigationLoader from "../loader/NavigationLoader";

interface LayoutWrapperProps {
  children: React.ReactNode;
}
 
const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
<div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <NavigationLoader />

      {/* Main body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay (mobile only) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static
            z-50 md:z-0
            top-0 left-0 h-full
            w-[26.8rem]
            bg-white border-r
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <SideBar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-[var(--store-bg)] mt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;