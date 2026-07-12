"use client";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit">Sign out</Button>
    </form>
  );
}
