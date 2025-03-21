import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    afterSignIn: "", 
    afterSignOut: "", 
  },
});
console.log("StackServerApp Methods:", Object.keys(stackServerApp));
