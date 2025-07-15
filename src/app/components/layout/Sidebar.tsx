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
    <div className="w-[20rem] h-screen bg-[rgb(3,16,51)] text-white">
    <SidebarProvider>
      <SidebarMenu>
        {sidebarData.map((item) =>
          item.children ? (
            <Collapsible key={item.title} defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="group w-full flex items-center">
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.title}
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children.map((child) => (
                      <SidebarMenuSubItem key={child.title}>
                        <Link href={child.url}>{child.title}</Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url || "#"}>
                <SidebarMenuButton>
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
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