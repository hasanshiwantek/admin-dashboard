// "use client";
// import React, { useState } from "react";
// import Header from "./Header";
// import { SideBar } from "./Sidebar";
// import NavigationLoader from "../loader/NavigationLoader";

// interface LayoutWrapperProps {
//   children: React.ReactNode;
// }

// const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <div className="flex flex-col h-screen overflow-hidden">
//       {/* Header */}
//       <Header onMenuClick={() => setSidebarOpen(true)} />
//       <NavigationLoader />

//       {/* Main body */}
//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Overlay (mobile only) */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/40 z-40 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <aside
//        className={`
//             fixed md:relative
//             z-50 md:z-0
//             top-0 left-0 
//             h-screen md:h-auto
//             w-[26.8rem]
//             bg-[rgb(3,16,51)] border-r border-[#2d3748]
//             transform transition-transform duration-300
//             ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//             md:translate-x-0
//             overflow-y-auto overflow-x-hidden
//           `}
//         >
//           <SideBar onClose={() => setSidebarOpen(false)} />
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 overflow-y-auto bg-[var(--store-bg)] mt-20">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default LayoutWrapper;











// import React from "react";
// import Header from "./Header";
// import { SideBar } from "./Sidebar";
// import NavigationLoader from "../loader/NavigationLoader";

// interface LayoutWrapperProps {
//   children: React.ReactNode;
// }



// const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
//   return (
//     <>
//       <div className="flex flex-col h-screen overflow-hidden">
//         {/* Header */}
//         <Header />
//         <NavigationLoader />

//         {/* Main body (Sidebar + Page Content) */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* Sidebar */}
//           <aside className="w-[26.8rem] shrink-0 overflow-y-auto border-r bg-white">
//             <SideBar />
//           </aside>

//           {/* Main content with scroll */}
//           <main className="flex-1 overflow-y-auto bg-[var(--store-bg)] mt-20 ">
//             {children}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LayoutWrapper;












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
  
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <NavigationLoader />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-[26.8rem] shrink-0 overflow-y-auto border-r bg-white">
            <SideBar />
          </aside>

          <main className="flex-1 overflow-y-auto bg-[var(--store-bg)] mt-20">
            {children}
          </main>
        </div>

      </div>

      {/* Mobile Sidebar via Portal */}
      {sidebarOpen && typeof window !== "undefined" && createPortal(
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
export default LayoutWrapper