"use client";

import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";
import { ColorModeSwitcher } from "./color-mode-switcher";
import { Logo } from "./logo";
import { Button, buttonVariants } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

interface NavProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

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
  const { data: session } = useSession();

  if (session) {
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

function AuthButtons() {
  return (
    <React.Suspense fallback={<SignInSignUpButtons />}>
      <AuthButtonsInner />
    </React.Suspense>
  );
}

function MobileItems(props: NavProps) {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {props.items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.title}
            </Link>
          ))}

          <div className="flex flex-col gap-2 mt-4">
            <AuthButtons />
          </div>
        </nav>
      </div>
    </div>
  );
}

function DesktopItems(props: NavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="hidden gap-6 md:flex">
      {props.items?.map((item, index) => (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
            item.href.startsWith(`/${segment}`)
              ? "text-foreground"
              : "text-foreground/60",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function LandingPageHeader(props: NavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <header className="fixed w-full z-50 bg-background/80 px-4 md:px-8 backdrop-blur">
      <div className="flex h-18 items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-10">
          <Logo className="hidden md:flex" />

          {props.items?.length ? <DesktopItems items={props.items} /> : null}

          <Button
            className="space-x-2 md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <Logo className="md:hidden" />

          {showMobileMenu && props.items && <MobileItems items={props.items} />}
        </div>

        <div className="flex gap-4 items-center">
          <ColorModeSwitcher />
          <nav className="gap-4 items-center hidden md:flex">
            <AuthButtons />
          </nav>
        </div>
      </div>
    </header>
  );
}