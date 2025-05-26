"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

function SignInSignUpButtons() {
  return (
    <div className="flex gap-2">
      <Link
        href="/auth/signin"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "bg-gray-800 text-white dark:bg-white dark:text-black px-4 py-2 rounded-md shadow-md"
        )}
      >
        Sign In
      </Link>
    </div>
  );
}

function AuthButtonsInner() {
  const session = useSession();

  if (session?.data) {
    return (
      <button
        onClick={() => signOut()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign Out
      </button>
    );
  } else {
    return <SignInSignUpButtons />;
  }
}

export function AuthButtons() {
  return (
    <React.Suspense fallback={<SignInSignUpButtons />}>
      <AuthButtonsInner />
    </React.Suspense>
  );
} 