import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminNavbar from "../components/admin-navbar";
import CustomTrigger from "../components/trigger"
// import { api } from "@/lib/api";

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
  //   const auth = await getAuthState();
  //   const user = await api("/api/users/me");
  return (
    <div className="flex items-start gap-4 text-sm">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AdminNavbar />
          <SidebarInset>
            <CustomTrigger />
            <div className="w-[80%]">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
