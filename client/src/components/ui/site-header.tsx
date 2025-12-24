import type { ReactNode } from "react"
import { Button } from "./button"
import { Separator } from "./separator"
import { SidebarTrigger } from "./sidebar"

import { Bell, FileChartColumn, Network } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"

import { Link } from "react-router-dom"

const notifications = [
  { title: "New Lead Assigned", desc: "A new lead has been assigned.", time: "2 mins ago", isRead: false },
  { title: "Payment Received", desc: "₹5,000 payment received.", time: "10 mins ago", isRead: false },
  { title: "Meeting Reminder", desc: "Client meeting at 4 PM.", time: "1 hour ago", isRead: true },
  { title: "Task Assigned", desc: "Follow up with client.", time: "Yesterday", isRead: false },
  { title: "Invoice Generated", desc: "Invoice #1023 generated.", time: "2 days ago", isRead: true },
  { title: "Lead Closed", desc: "Lead marked as Closed Won.", time: "3 days ago", isRead: true },
  { title: "New Message", desc: "Message from Manager.", time: "4 days ago", isRead: false },
  { title: "System Update", desc: "CRM updated successfully.", time: "5 days ago", isRead: true },
  { title: "Password Changed", desc: "Security update successful.", time: "6 days ago", isRead: true },
  { title: "New User Added", desc: "A new user joined your team.", time: "1 week ago", isRead: false }
];





export function SiteHeader({ currentPath, }: { currentPath: ReactNode }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-b-gray-300 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium capitalize">{currentPath}</h1>
        <div className="ml-auto flex items-center gap-2">

          <div className="flex gap-2">
            <Link to={'/network'}>
              <Button variant={"outline"}>
                <Network /><span className="hidden lg:block xl:block">Network</span>
              </Button>
            </Link>
            <Link to={"/reports"}>
              <Button variant={"outline"}>
                <FileChartColumn />
                <span className="hidden lg:block xl:block">Reports</span>
              </Button>
            </Link>
          </div>
          <Button variant="outline" asChild size="sm" className="hidden sm:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Bell /><span className="hidden lg:block xl:block">Notifications</span></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-2 py-3 rounded-lg w-50 border border-gray-200 bg-white lg:w-70" align="end">
                <label className=" text-sm">Notifications</label>
                <DropdownMenuGroup>
                  {
                    notifications.map((item, index) => (
                      <DropdownMenuItem key={index} className={`${!item.isRead ? "hidden " : ""} mt-0.5 py-2 px-2 outline-0 hover:bg-gray-200 hover:rounded-lg`}>
                        <div className="grid grid-cols-12 gap-1">
                          <section className="relative col-span-2">
                            <img className="w-10 h-10  rounded-full object-cover" src="/src/assets/avtar.jpg" alt="" />
                            {
                              item.isRead ? (<span className={`absolute bg rounded-full top-0 h-2 w-2 bg-red-500`}></span>) : ""
                            }
                          </section>
                          <section className="col-span-9">
                            <label className=" text-sm">{item.title}</label>
                            <p className="text-[10px]">{item.desc}</p>
                          </section>
                        </div>
                      </DropdownMenuItem>
                    ))
                  }

                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>

        </div>
      </div>
    </header>
  )
}
