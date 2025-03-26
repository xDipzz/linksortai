"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      setError("")
      await signIn("github", { callbackUrl: "/" })
    } catch (err) {
      console.error("Sign in error:", err)
      setError("An error occurred during sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Sign In</h1>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full bg-gray-800 text-white dark:bg-gray-700 py-3 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300 disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign in with GitHub"}
        </button>
      </div>
    </div>
  )
}

