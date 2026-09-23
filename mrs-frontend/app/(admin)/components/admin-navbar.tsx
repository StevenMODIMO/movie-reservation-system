"use client";
import Link from "next/link";
import Image from "next/image";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoutButton from "@/components/logout-button";

import {
  Target,
  Film,
  TvMinimalPlay,
  Users,
  Armchair,
  ChartNoAxesCombined,
  TicketCheck,
  Bolt,
  MonitorCog,
} from "lucide-react";

import CustomTrigger from "./trigger";

type User = {
  user_id: string;
  username: string;
  email: string;
  role: string;
  avatar_url: string;
};

type NavbarProps = {
  isAuthenticated: boolean;
  user: User | null;
};

import { usePathname } from "next/navigation";

export default function AdminNavbar({ isAuthenticated, user }: NavbarProps) {
  const pathname = usePathname();
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  return (
    <div className="flex flex-col items-start gap-4 w-[10%]">
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <CustomTrigger />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={() => isMobile && setOpenMobile(false)}
                  isActive={pathname === "/mrsai"}
                >
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
                <SidebarMenuButton
                  asChild
                  onClick={() => isMobile && setOpenMobile(false)}
                  isActive={pathname === "/mrsai/movies"}
                >
                  <Link href="/mrsai/movies">
                    <Film />
                    <span>Movies</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={() => isMobile && setOpenMobile(false)}
                  isActive={pathname === "/mrsai/showtimes"}
                >
                  <Link href="/mrsai/showtimes">
                    <TvMinimalPlay />
                    <span>Showtimes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={() => isMobile && setOpenMobile(false)}
                  isActive={pathname === "/mrsai/reservations"}
                >
                  <Link href="/mrsai/reservations">
                    <TicketCheck />
                    <span>Reservations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={() => isMobile && setOpenMobile(false)}
                  isActive={pathname === "/mrsai/users"}
                >
                  <Link href="/mrsai/users">
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={() => isMobile && setOpenMobile(false)}
                  isActive={pathname === "/mrsai/cinema"}
                >
                  <Link href="/mrsai/cinema">
                    <Armchair />
                    <span>Halls & Seats</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Reporting</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={() => isMobile && setOpenMobile(false)}
                  isActive={pathname === "/mrsai/revenue"}
                >
                  <Link href="/mrsai/revenue">
                    <ChartNoAxesCombined />
                    <span>Revenue</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={() => isMobile && setOpenMobile(false)}
                  isActive={pathname === "/mrsai/setup"}
                >
                  <Link href="/mrsai/setup">
                    <Bolt />
                    <span>Setup</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {user && (
            <div className="relative w-10 h-10">
              <Image
                src={user.avatar_url}
                alt={user.username}
                fill={true}
                priority
                className="rounded-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <LogoutButton />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
