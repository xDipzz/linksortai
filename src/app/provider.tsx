'use client';

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Provider(props: { children?: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        {props.children}
      </ThemeProvider>
    </SessionProvider>
  );
}