"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Mail, Lock, Diamond, User, Eye, EyeOff, Image, X } from "lucide-react";
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
import HeroSlider from "./slideshow";

interface FormData {
  email: string;
  password: string;
  username: string;
  avatar: File | null;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    avatar: null,
  });
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
        avatar: file,
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
      avatar: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", {
      email: formData.email,
      password: formData.password,
      avatar: formData.avatar?.name,
    });
  };

  return (
    <div className="lg:flex">
      <HeroSlider />
      <Card className="w-fit mx-4 sm:w-[60%] md:w-[50%] lg:w-[30%] sm:mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create new account to get started</CardDescription>
          <CardAction>Get started</CardAction>
        </CardHeader>
        <CardContent>
          <form
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
                  placeholder="name@example.com"
                  className="pl-10"
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
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="text"
                  placeholder="John Smith"
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign Up
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
