"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SignUp() {
  const router = useRouter()

  useEffect(() => {
    router.push("/auth/signin")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to sign in...</p>
    </div>
  )
}

