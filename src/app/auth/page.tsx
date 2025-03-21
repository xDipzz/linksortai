"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { stackServerApp } from "../../../auth"; // Adjust import path if necessary

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use stackServerApp.auth.signUp instead of stackServerApp.signUp
      const result = await stackServerApp.auth.signUp({ email, password });

      if (result.success) {
        router.push("/dashboard");
      } else {
        alert("Sign up failed: " + result.error);
      }
    } catch (err) {
      console.error("Error during sign-up", err);
      alert("Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
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
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
