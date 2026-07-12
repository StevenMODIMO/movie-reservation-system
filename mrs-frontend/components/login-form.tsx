"use client";
import Link from "next/link";
import { Mail, Lock, Diamond, InfoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { login } from "@/app/actions";
import { useActionState, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const initialState = {
  success: false,
  error: null,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(state.error);
  }, [state.error]);

  return (
    <Card className="w-fit mx-4 sm:w-[60%] md:w-[50%] lg:w-[30%] sm:mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to continue</CardDescription>
        <CardAction>Login</CardAction>
      </CardHeader>
      <CardContent>
        <AnimatePresence initial={false} mode="popLayout">
          {error && (
            <motion.div
              key={state.error}
              layout
              initial={{ opacity: 0, y: -10, scale: 0.98, height: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
              exit={{ opacity: 0, y: -8, scale: 0.98, height: 0 }}
              transition={{
                type: "spring",
                stiffness: 520,
                damping: 34,
                mass: 0.9,
                opacity: { duration: 0.16 },
                height: { duration: 0.22, ease: "easeInOut" },
              }}
              className="overflow-hidden"
            >
              <Alert variant="destructive" className="gap-2">
                <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="space-y-1">
                  <AlertTitle>Signin failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </div>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <form
          action={formAction}
          onFocus={() => setError(null)}
          className="space-y-6 mt-2 w-full max-w-md mx-auto"
        >
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
          <Button
            disabled={isPending}
            type="submit"
            className="w-full disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner />
                <span>Signing in...</span>
              </div>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
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
          <p className="font-medium sm:text-center">
            By continuing, you agree to our
          </p>
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
