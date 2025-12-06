import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight" | "subtle";
}

export function GlowCard({ children, className, variant = "default" }: GlowCardProps) {
  const variants = {
    default: "glass-card",
    highlight: "glass-card hover:shadow-[0_0_40px_hsl(28_57%_46%_/_0.2)]",
    subtle: "dashboard-card",
  };

  return (
    <div className={cn(variants[variant], "p-6", className)}>
      {children}
    </div>
  );
}
