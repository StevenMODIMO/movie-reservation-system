import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { getAuthState } from "@/lib/auth";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Online Movie Ticket Booking System | Cinema Seat Reservation & Showtimes (MRS)",
    template: "%s | MRS",
  },
  description:
    "Book movie tickets online with ease. View showtimes, select seats, and reserve cinema tickets instantly using our fast and secure movie reservation system.",
  keywords: [
    "movie reservation system",
    "online movie booking",
    "cinema ticket booking",
    "movie showtimes",
    "seat selection",
    "book movie tickets online",
    "theater reservation system",
  ],
  openGraph: {
    title: "Online Movie Ticket Booking System",
    description:
      "Reserve movie tickets, choose seats, and explore showtimes instantly.",
    url: "https://yourdomain.com",
    siteName: "Movie Booking Platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movie Ticket Booking System",
    description: "Fast and secure cinema reservation platform.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuthState();
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, geistHeading.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar isAuthenticated={auth.isAuthenticated} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
