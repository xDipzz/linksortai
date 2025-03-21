"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { stackServerApp } from "../../../../auth"; // Adjust the import path if needed

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use stackServerApp.auth.signIn instead of stackServerApp.signIn
      const result = await stackServerApp.auth.signIn({ email, password });

      if (result.success) {
        router.push("/dashboard");
      } else {
        alert("Sign in failed: " + result.error);
      }
    } catch (err) {
      console.error("Error during sign-in", err);
      alert("Error signing in");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}
