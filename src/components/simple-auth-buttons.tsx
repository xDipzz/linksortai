import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function SimpleAuthButtons() {
  return (
    <div className="flex gap-2">
      <Link
        href="#signup"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md shadow-md"
        )}
      >
        Get Started
      </Link>
    </div>
  );
} 