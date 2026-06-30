"use client"
import Link from "next/link"

export default function Navbar() {

  return (
  <nav className="flex items-center gap-3 p-4">
    <Link href="/">Browse</Link>
    <Link href="/login">Login</Link>
    <Link href="/signup">Signup</Link>
  </nav>
)
}
