"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import {
  Mail,
  Lock,
  Diamond,
  User,
  Eye,
  EyeOff,
  Image,
  X,
  InfoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import HeroSlider from "./slideshow";
import { motion, AnimatePresence } from "motion/react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const API = process.env.NEXT_PUBLIC_BACKEND_API_URL as string;

interface FormData {
  email: string;
  password: string;
  username: string;
  file: File | null;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    file: null,
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setPreviewUrl(null);
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formdata = new FormData();
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    formdata.append("username", formData.username);
    if (formData.file) formdata.append("file", formData.file);

    try {
      const response = await fetch(`${API}/api/users/signup`, {
        method: "POST",
        body: formdata,
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json?.detail);
      } else {
        setSuccess(json?.message);
        setFormData({
          email: "",
          password: "",
          username: "",
          file: null,
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:flex">
      <Card className="w-fit mx-4 sm:w-[60%] md:w-[50%] lg:w-[30%] sm:mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create new account to get started</CardDescription>
          <CardAction>Get started</CardAction>
        </CardHeader>
        <CardContent>
          <AnimatePresence initial={false} mode="popLayout">
            {success && (
              <motion.div
                key={success}
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
                <Alert className="gap-2">
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="space-y-1">
                    <AlertTitle>Signup completed.</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                  </div>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false} mode="popLayout">
            {error && (
              <motion.div
                key={error}
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
                    <AlertTitle>Signup failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </div>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <form
            onFocus={() => setError(null)}
            className="space-y-6 w-full max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <Label
                htmlFor="avatar"
                className="w-fit mx-auto p-2 cursor-pointer"
              >
                {previewUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={previewUrl}
                      alt="Avatar preview"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <X onClick={handleRemoveAvatar} />
                  </div>
                ) : (
                  <Image />
                )}
              </Label>
              <Input
                ref={fileInputRef}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex justify-between items-center"
              >
                <span>Password</span>
                <div
                  className="flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </div>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  className="pl-10"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="John Smith"
                  className="pl-10"
                  onChange={handleInputChange}
                  value={formData.username}
                />
              </div>
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>Creating account...</span>
                </div>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-xs flex items-start md:items-center flex-col gap-3">
          <div className="flex gap-2">
            <p>Already have an account ?</p>
            <Link href="/login" className="underline">
              Sign in
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
              <Diamond className="w-2 h-2" />
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
