"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import LogoutButton from "./logout-button";

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

export default function Navbar({ isAuthenticated, user }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <Link href="/browse">Browse</Link>
          </>
        ) : (
          <>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>

      {isAuthenticated && user && (
        <div className="flex items-center gap-3">
          {user.avatar_url.endsWith("avatar.png") ? (
            <CircleUserRound className="size-9 text-muted-foreground" />
          ) : (
            <Image
              src={user.avatar_url}
              alt={user.username}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          )}

          <div className="flex flex-col leading-tight">
            <span className="font-medium">{user.username}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>

          <LogoutButton />
        </div>
      )}
    </nav>
  );
}
