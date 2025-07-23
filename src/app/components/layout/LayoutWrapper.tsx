// import React from "react";
// import Header from "./Header";
// import { SideBar } from "./Sidebar";
// import NavigationLoader from "../loader/NavigationLoader";
// interface LayoutWrapperProps {
//   children: React.ReactNode;
// }

// const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
//   return (
//      <>
//       <Header />
//       <NavigationLoader/>
//       <div className="flex  h-[calc(100vh-5.5rem)] overflow-hidden ">
//         <div className="w-[26.8rem] shrink-0 h-full overflow-y-auto z-50">
//           <SideBar />
//         </div>

//         <main className="flex-1 overflow-y-auto bg-[var(--store-bg)] ">
//           {children}
//         </main>
//       </div>
//     </>
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
//       <Header />
//       <NavigationLoader />
//       <div className="flex min-h-[calc(100vh-5.5rem)]">
//         <div className="w-[26.8rem] shrink-0 h-auto overflow-y-auto z-20">
//           <SideBar />
//         </div>

//         <main className="flex-1 bg-[var(--store-bg)] mt-20">
//           {children}
//           </main>
//       </div>
      
//     </>
//   );
// };

// export default LayoutWrapper;
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
          <main className="flex-1 overflow-y-auto bg-[var(--store-bg)] mt-20 px-6 py-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
 
export default LayoutWrapper;