import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import UserNavbar from "../components/user-navbar";
import { api } from "@/lib/api";
import { getAuthState } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    default: "(MRS) - User Interface.",
    template: "%s | (MRS - User Interface)",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuthState();
  const user = await api<any>("/api/users/me");
  return (
    <div>Hello</div>
  );
}
