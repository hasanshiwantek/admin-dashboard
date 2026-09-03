"use client";
import React, { useState } from "react";
import Header from "./Header";
import { SideBar } from "./Sidebar";
import NavigationLoader from "../loader/NavigationLoader";
import { createPortal } from "react-dom";
import { ChevronRight } from "lucide-react";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <NavigationLoader />

        <div className="flex flex-1 overflow-hidden mt-20">
          <aside
            className={`hidden md:block shrink-0 h-full transition-all duration-300 ease-in-out ${desktopCollapsed ? "w-0" : "w-[26.8rem]"
              }`}
          >
            <div
              className={`h-full w-[26.8rem] ${desktopCollapsed ? "hidden" : "block"
                }`}
            >
              <SideBar />
            </div>
          </aside>

          <button
            type="button"
            onClick={() => setDesktopCollapsed((v) => !v)}
            className="hidden md:flex items-center justify-center
      fixed z-50 h-11 w-11 rounded-full
      bg-[rgb(3,16,51)] text-white
      border-2 border-white/20 shadow-lg
      hover:bg-[#0a1a42]
      bottom-24"
            style={{
              left: desktopCollapsed ? 8 : "26.8rem",
              transform: "translateX(-50%)",
            }}
            aria-label={desktopCollapsed ? "Open sidebar" : "Close sidebar"}
          >
            <ChevronRight
              className={`h-5 w-5 transition-transform duration-300 ${desktopCollapsed ? "rotate-0" : "rotate-180"
                }`}
            />
          </button>

          <main className="flex-1 overflow-y-auto bg-[var(--store-bg)]">
            {children}
          </main>
        </div>
      </div>

      {sidebarOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed top-0 left-0 h-full w-[26.8rem] z-50 overflow-y-auto animate-in slide-in-from-left">
              <SideBar onClose={() => setSidebarOpen(false)} />
            </aside>
          </>,
          document.body
        )}
    </>
  );
};

export default LayoutWrapper;