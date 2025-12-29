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
import { sidebarData } from "@/const/sidebarData";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export const SideBar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
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
      className="shrink-0 h-auto
  fixed top-0 md:top-22
  z-50 md:z-0
  w-[26.7rem]
  max-h-full
  overflow-y-auto overflow-x-hidden
  bg-[rgb(3,16,51)]
  text-white
  border-t-2 border-[#2d3748]
  custom-scroll"
    >
      <SidebarProvider>
        <SidebarMenu>
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
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="group w-full flex items-center p-8 cursor-pointer text-xl 2xl:!text-2xl">
                      {item.icon && <item.icon className="mr-2 !h-8 !w-8" />}
                      {item.title}
                      <ChevronDown className="ml-auto !h-7 !w-7 transition-transform group-data-[state=open]:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-16">
                      {item.children.map((child: any) => (
                        <SidebarMenuSubItem key={child.title}>
                          <Link
                            href={child.url}
                            className={`text-xl 2xl:!text-2xl !leading-8 cursor-pointer px-4 py-2 rounded-md block ${
                              pathname === child.url ? "bg-[#24345c]" : ""
                            }`}
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
                  className={`p-8 cursor-pointer text-xl 2xl:!text-2xl rounded-md ${
                    pathname === item.url ? "bg-[#24345c]" : ""
                  }`}
                >
                  <Link href={item.url || "#"} className="flex items-center">
                    {item.icon && <item.icon className="mr-2 !h-8 !w-8" />}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarProvider>
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
