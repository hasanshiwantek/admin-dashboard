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
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {/* Header */}
        <Header />
        <NavigationLoader />
 
        {/* Main Area */}
        <div className="flex flex-1 h-full">
          {/* Sidebar */}
          <aside className="w-[26.8rem] shrink-0 h-full overflow-y-auto z-50">
            <SideBar />
          </aside>
 
          {/* Main Content */}
          <main className="flex-1 h-full overflow-y-auto bg-[var(--store-bg)] my-10 p-10">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
 
export default LayoutWrapper;
