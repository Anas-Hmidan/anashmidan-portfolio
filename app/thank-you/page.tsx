"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function ThankYou() {
  const router = useRouter()

  // Redirect back to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/#contact")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-teal-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-300 mb-6">
          Your message has been sent successfully. I'll get back to you as soon as possible.
        </p>
        <p className="text-gray-400 text-sm">You will be redirected back to the homepage in a few seconds...</p>
      </div>
    </div>
  )
}

