"use client";
import Link from "next/link";
import LogoutButton from "./logout-button";

type NavbarProps = {
  isAuthenticated: boolean;
};

export default function Navbar({ isAuthenticated }: NavbarProps) {
  return (
    <nav className="flex items-center gap-3 p-4">
      {isAuthenticated ? (
        <>
          <Link href="/browse">Browse</Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
