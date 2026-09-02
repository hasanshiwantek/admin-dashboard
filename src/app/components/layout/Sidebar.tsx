"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
// import { sidebarData } from "@/const/sidebarData";
import { useSidebarData } from "@/const/sidebarDataDynamic"; // jahan file rakhi hai

import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export const SideBar = ({
  onClose,
  isCollapsed,
  setIsCollapsed,
   isHovered,
     setIsHovered,
}: {
  onClose?: () => void;
  isCollapsed?: boolean;
    isHovered?: boolean;
  setIsCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsHovered?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarData = useSidebarData();

  const [openMenus, setOpenMenus] = useState<boolean[]>(
    sidebarData.map(() => false)
  );
  
  useEffect(() => {
    const newOpenMenus = sidebarData.map(
      (item) =>
        item.children?.some((child: any) => child.url === pathname) || false
    );
    setOpenMenus(newOpenMenus);
  }, [pathname]);

  return (
    <div
  className={`relative h-full
  fixed top-0 md:top-22
  z-30 md:z-30
${
  isCollapsed
    ? isHovered
      ? "w-[26.7rem]"
      : "w-[4.3rem]"
    : "w-[26.7rem]"
}
  max-h-full
overflow-y-hidden overflow-x-hidden
  bg-[rgb(3,16,51)]
  text-white
  border-t-2 border-[#2d3748]
  custom-scroll
  transition-[width] duration-200 ease-in-out`}
    >
      <SidebarProvider>
        <SidebarMenu  className="gap-0">
          {sidebarData.map((item, index) =>
            item.children ? (
              <Collapsible
                key={item.title}
                className="group/collapsible"
                open={openMenus[index]}
                onOpenChange={(isOpen) => {
                  const newState = [...openMenus];
                  newState[index] = isOpen;
                  setOpenMenus(newState);
                }}
              >
                <SidebarMenuItem>
               <div className="group flex items-center w-full rounded-md hover:bg-sidebar-accent"> 
  <SidebarMenuButton 
    className={` 
       flex-1 items-center cursor-pointer 
      transition-all duration-200  group-hover:!text-black
      ${ 
        isCollapsed && !isHovered 
          ? "justify-center !p-0 h-[54px]" 
          : "p-8 text-xl 2xl:!text-2xl" 
      } 
    `}
    onClick={() => {
      if (item.children?.length > 0) {
        router.push(item.children[0].url);
      }
    }}
  >
    {item.icon && ( 
      <item.icon 
        className={` 
          shrink-0 
          transition-all duration-200 
          ${ 
            isCollapsed && !isHovered 
              ? "!h-7 !w-7 !m-0" 
              : "mr-2 !h-8 !w-8" 
          } 
        `} 
      />
    )}

    {(!isCollapsed || isHovered) && item.title}
  </SidebarMenuButton>

  {(!isCollapsed || isHovered) && (
    <CollapsibleTrigger asChild>
      <button
        type="button"
        className="p-2 rounded-md hover:bg-transparent"

      >
      <ChevronDown className="!h-7 !w-7 text-white group-hover:text-black transition-transform group-data-[state=open]:rotate-180" />
      </button>
    </CollapsibleTrigger>
  )}
</div>
                  <CollapsibleContent   className={`
    ${isCollapsed && !isHovered ? "hidden" : ""}
  `}>
                    <SidebarMenuSub className="ml-16">
                      {item.children.map((child: any) => (
                        <SidebarMenuSubItem key={child.title}>
                          <Link
                            href={child.url}
                            className={`text-xl 2xl:!text-2xl !leading-8 cursor-pointer px-4 py-2 rounded-md block ${pathname === child.url ? "bg-[#24345c]" : ""
                              }`}
                            onClick={(e) => {
                              const link = ["/manage/products", "/manage/products/brands", "/manage/products/categories", "/manage/orders", "/manage/products/export", "/manage/orders/export", "/manage/customers/export"]
                              // console.log(pathname, child.url);

                              if (pathname === child.url) {
                                e.preventDefault();
                                // if (link.includes(child.url)) {
                                // router.push(`${child.url}?t=${Date.now()}`);
                                window.location.reload()
                                // }
                              }
                            }}
                          >
                            {child.title}
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
  asChild
  className={`
    cursor-pointer rounded-md
    transition-all duration-200 

    ${
      isCollapsed && !isHovered
        ? "justify-center !p-0 h-[54px]"
        : "p-8 text-xl 2xl:!text-2xl"
    }
    ${pathname === item.url ? "bg-[#24345c]" : ""}
  `}
>
  <Link
    href={item.url || "#"}
    className="flex items-center"
  >
    {item.icon && (
      <item.icon
        className={`
          shrink-0 transition-all duration-200 
          ${
            isCollapsed && !isHovered
              ? "!h-7 !w-7 !m-0"
              : "mr-2 !h-8 !w-8"
          }
        `}
      />
    )}

    {(!isCollapsed || isHovered) && item.title}
  </Link>
</SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarProvider>
  <button
  type="button"
onClick={() => {
  setIsHovered?.(false);
  setIsCollapsed?.((prev) => !prev);
}}
  className={`fixed bottom-8 z-[99999]
    flex h-[43px] w-[43px] -translate-x-1/2 -translate-y-1/2
    items-center justify-center
    rounded-full border border-gray-300
    bg-[#24345c] shadow-md
    transition-[left] duration-200 ease-in-out
    ${
  isCollapsed
    ? isHovered
      ? "left-[26.7rem]"
      : "left-[6rem]"
    : "left-[26.7rem]"
}
`}
>
  <ChevronRight
    className={`h-7 w-7 text-white transition-transform duration-200 ${
      isCollapsed ? "rotate-180" : ""
    }`}
  />
</button>
      <div className="md:hidden sticky bottom-0 bg-[rgb(3,16,51)] border-t border-[#2d3748] p-4">
        <button
          onClick={onClose}
          className="w-full text-white text-lg py-3 rounded-md bg-[#24345c] hover:bg-[#2f4375]"
        >
          Close Menu
        </button>
      </div>
    </div>
  );
};
