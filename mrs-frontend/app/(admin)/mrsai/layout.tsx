import type { Metadata } from "next";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminNavbar from "../components/admin-navbar";
import { api } from "@/lib/api";
import { getAuthState } from "@/lib/auth";
import CustomTrigger from "../components/trigger";

export const metadata: Metadata = {
  title: {
    default: "(MRS) - Administration Interface.",
    template: "%s | (MRS - Admin Interface)",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuthState();
  const { data, error } = await api<any>("/api/users/me");
  return (
    <SidebarProvider>
      <AdminNavbar isAuthenticated={auth.isAuthenticated} user={data} />

      <SidebarInset>
        <main className="w-full p-4">
          <CustomTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
