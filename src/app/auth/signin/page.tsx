"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h1>
        <button
          onClick={() => signIn("github")}
          className="w-full bg-gray-800 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}