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
      <Header />
      <NavigationLoader />
      <div className="flex min-h-[calc(100vh-5.5rem)]">
        <div className="w-[26.8rem] shrink-0 h-auto overflow-y-auto z-20">
          <SideBar />
        </div>
        <main className="flex-1 bg-[var(--store-bg)] mt-20 ">{children}</main>
      </div>
    </>
  );
};

export default LayoutWrapper;
