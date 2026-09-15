"use client";
import Link from "next/link";

import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
} from "@/components/ui/sidebar";

import { Target } from "lucide-react";

export default function AdminNavbar() {
  return (
    <div className="flex flex-col items-start gap-4 w-[10%]">
      {/* <Link href="/mrsai/">Overview</Link>
      <Link href="/mrsai/revenue">Revenue</Link>
      <Link href="/mrsai/setup">Setup</Link> */}
      <Sidebar collapsible="icon">
        <SidebarHeader>Steven</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroupAction>stuff</SidebarGroupAction>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/mrsai/">
                    <Target />

                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/mrsai/movies">Movies</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/mrsai/showtimes">Showtimes</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/mrsai/reservations">Reservations</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/mrsai/users">Users</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/mrsai/cinema">Halls & Seats</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Reporting</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/mrsai/revenue">Revenue</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/mrsai/setup">Setup</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>Modimo</SidebarFooter>
      </Sidebar>
    </div>
  );
}
