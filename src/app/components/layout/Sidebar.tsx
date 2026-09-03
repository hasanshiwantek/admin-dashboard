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
import { useRouter, usePathname } from "next/navigation";
import { useSidebarData } from "@/const/sidebarDataDynamic";
import { ChevronDown, X } from "lucide-react";

export const SideBar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarData = useSidebarData();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const activeIndex = sidebarData.findIndex((item) =>
      item.children?.some((child: any) => child.url === pathname)
    );
    setOpenIndex(activeIndex === -1 ? null : activeIndex);
  }, [pathname, sidebarData]);

  const goToFirstChild = (item: any) => {
    const firstChild = item.children?.[0];
    if (!firstChild?.url) return;

    if (pathname === firstChild.url) {
      window.location.reload();
    } else {
      router.push(firstChild.url);
    }
    onClose?.();
  };

  return (
    <div
      className="h-full w-full
        overflow-y-auto overflow-x-hidden
        bg-[rgb(3,16,51)]
        text-white
        border-t-2 border-[#2d3748]
        custom-scroll
        flex flex-col"
    >
      {onClose && (
        <div className="md:hidden sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[rgb(3,16,51)] border-b border-[#2d3748]">
          <span className="text-xl font-medium">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#24345c] hover:bg-[#2f4375]"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}

      <SidebarProvider>
        <SidebarMenu>
          {sidebarData.map((item, index) =>
            item.children ? (
              <Collapsible
                key={item.title}
                className="group/collapsible"
                open={openIndex === index}
                onOpenChange={() => {
                  setOpenIndex(index);
                  goToFirstChild(item);
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
                            onClick={(e) => {
                              if (pathname === child.url) {
                                e.preventDefault();
                                window.location.reload();
                              } else {
                                onClose?.();
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
                  className={`p-8 cursor-pointer text-xl 2xl:!text-2xl rounded-md ${
                    pathname === item.url ? "bg-[#24345c]" : ""
                  }`}
                >
                  <Link
                    href={item.url || "#"}
                    className="flex items-center"
                    onClick={() => {
                      setOpenIndex(null);
                      onClose?.();
                    }}
                  >
                    {item.icon && <item.icon className="mr-2 !h-8 !w-8" />}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarProvider>

      {onClose && (
        <div className="md:hidden sticky bottom-0 bg-[rgb(3,16,51)] border-t border-[#2d3748] p-4 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="w-full text-white text-lg py-3 rounded-md bg-[#24345c] hover:bg-[#2f4375]"
          >
            Close Menu
          </button>
        </div>
      )}
    </div>
  );
};