"use client";

import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <LandingPageHeader
          items={[
            { title: "Home", href: "/" },
            { title: "Features", href: "/#features" },
            {
              title: "GitHub",
              href: "https://github.com/xDipzz/linksortai",
              external: true,
            },
          ]}
          rightElement={<ThemeToggle />} // need to add here toggle thing 
        />
        <main className="flex-1">{props.children}</main>
        <Footer
          builtBy="LinkSortAI by Deepak Mahajan"
          builtByLink="https://linksorai.com/"
          githubLink="https://github.com/xDipzz/linksortai"
          twitterLink="https://twitter.com/linksortai"
          linkedinLink="https://www.linkedin.com/in/deepak-mahajan-b1181a214/"
        />
      </div>
    </ThemeProvider>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  
  function toggleTheme() {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}