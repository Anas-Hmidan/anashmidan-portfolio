"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useLanguage } from "@/contexts/language-context"
import translations from "@/translations"

// Dynamically import the Three.js components with no SSR
const ThreeScene = dynamic(
  () =>
    import("@/components/three-scene").catch((err) => {
      console.error("Error loading ThreeScene:", err)
      return () => (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-teal-400">3D scene unavailable</div>
        </div>
      )
    }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-pulse">
            <span className="text-teal-400">A</span>nas <span className="text-teal-400">H</span>midan
          </h1>
          <p className="text-gray-300 text-xl animate-pulse">IT Student | Information Systems Development</p>
          <div className="loading-spinner mt-8"></div>
        </div>
      </div>
    ),
  },
)

export default function Hero() {
  const { language, isRTL } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [threeJsError, setThreeJsError] = useState(false)

  // Use a safe way to access translations
  const t = mounted ? translations[language] : translations.en

  // Set mounted state on client-side
  useEffect(() => {
    setMounted(true)

    // Add an error handler to detect Three.js issues
    const handleError = (event) => {
      if (
        event.message &&
        (event.message.includes("three") || event.message.includes("webgl") || event.message.includes("canvas"))
      ) {
        console.error("Three.js error detected:", event)
        setThreeJsError(true)
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  return (
    <section id="home" className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {mounted && !threeJsError ? (
          <ThreeScene />
        ) : threeJsError ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-teal-400">A</span>nas <span className="text-teal-400">H</span>midan
              </h1>
              <p className="text-gray-300 text-xl mb-8">IT Student | Information Systems Development</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-pulse">
                <span className="text-teal-400">A</span>nas <span className="text-teal-400">H</span>midan
              </h1>
              <p className="text-gray-300 text-xl animate-pulse">IT Student | Information Systems Development</p>
              <div className="loading-spinner mt-8"></div>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 z-20 relative flex items-center justify-center h-full">
        <div className="max-w-xl mx-auto text-center absolute bottom-24 sm:bottom-20 md:bottom-16">
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors duration-300"
            >
              {t.contactMe}
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border border-teal-500 text-teal-500 hover:bg-teal-500/10 rounded-full transition-colors duration-300"
            >
              {t.viewProjects}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-400 hover:text-teal-400 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}

