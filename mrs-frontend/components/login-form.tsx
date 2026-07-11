"use client";
import Link from "next/link";
import { Mail, Lock, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { login } from "@/app/actions"
import { useFormStatus } from 'react-dom'
import SubmitButton from "./login-button"

export default function LoginForm() {
  const { pending } = useFormStatus()
  console.log(pending)
  return (
    <Card className="w-fit mx-4 sm:w-[60%] md:w-[50%] lg:w-[30%] sm:mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to continue</CardDescription>
        <CardAction>Login</CardAction>
      </CardHeader>
      <CardContent>
        <form action={login} className="space-y-6 w-full max-w-md mx-auto">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="name@example.com"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
          </div>
          <SubmitButton />
          {/* <Button type="submit" className="w-full">
            Sign In
          </Button> */}
        </form>
      </CardContent>
      <CardFooter className="text-xs flex items-start md:items-center flex-col gap-3">
        <div className="flex gap-2">
          <p>Don't have an account ?</p>
          <Link href="/signup" className="underline">
            Create one
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium sm:text-center">By continuing, you agree to our</p>
          <div className="flex gap-2 items-center">
            <Link href="/tos" className="underline">
              Terms of Service
            </Link>
            <Diamond className="h-2 w-2" />
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
