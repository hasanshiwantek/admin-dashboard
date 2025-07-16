import Link from "next/link"
import {
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible"
import { sidebarData } from "@/const/sidebarData"
import { ChevronDown } from "lucide-react"


export const SideBar = () => {
  return (
    <div className="w-[26.7rem] h-full max-h-full overflow-y-auto overflow-x-hidden bg-[rgb(3,16,51)] text-white border-t-2 border-[#2d3748] custom-scroll">
    <SidebarProvider>
      <SidebarMenu>
        {sidebarData.map((item) =>
          item.children ? (
            <Collapsible key={item.title} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="group w-full flex items-center p-8 cursor-pointer text-xl">
                    {item.icon && <item.icon  className="mr-2 !h-8 !w-8" />}
                    {item.title }
                    <ChevronDown  className="ml-auto !h-7 !w-7 transition-transform group-data-[state=open]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent >
                  <SidebarMenuSub className="ml-16">
                    {item.children.map((child) => (
                      <SidebarMenuSubItem key={child.title}>
                        <Link href={child.url} className="!text-[13px] !leading-12 cursor-pointer ">{child.title}</Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url || "#"}>
                <SidebarMenuButton className="p-8 cursor-pointer text-xl">
                  {item.icon && <item.icon  className="mr-2 !h-8 !w-8 " />}
                  {item.title}  
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarProvider>
    </div>
  )
}