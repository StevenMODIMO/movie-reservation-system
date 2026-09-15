"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, Dot } from "lucide-react";
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
          <div>
            {/* <div className="flex items-center gap-2 dark:bg-black/90 p-1 rounded">
              <Dot className="text-green-500 animate-ping" size={24} />
              <p className="text-xs">System Status: Good</p>
            </div> */}
          </div>
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
            <div className="relative w-10 h-10">
              <Image
                src={user.avatar_url}
                alt={user.username}
                fill={true}
                priority
                className="rounded-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
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
