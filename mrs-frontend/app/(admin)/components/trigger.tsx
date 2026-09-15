"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

export default function CustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return <PanelLeft onClick={toggleSidebar}  className="cursor-pointer" />;
}
