"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

// Create a default context value to use during server-side rendering
const defaultContextValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  isRTL: false,
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with English as default
  const [language, setLanguageState] = useState<Language>("en")
  const [isRTL, setIsRTL] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Set mounted state on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load saved language preference on mount
  useEffect(() => {
    if (!mounted) return

    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      } else {
        // Ensure we have a valid default
        localStorage.setItem("language", "en")
      }
    } catch (error) {
      // Handle any localStorage errors
      console.error("Error accessing localStorage:", error)
      // Set a default language if there's an error
      setLanguageState("en")
    }
  }, [mounted])

  // Update RTL state when language changes
  useEffect(() => {
    setIsRTL(language === "ar")

    if (mounted) {
      // Save language preference
      try {
        localStorage.setItem("language", language)
      } catch (error) {
        console.error("Error saving to localStorage:", error)
      }
    }

    // Update HTML dir attribute for RTL support
    if (mounted && typeof document !== "undefined") {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

      // Add RTL class to body for global styling
      if (language === "ar") {
        document.body.classList.add("rtl")
      } else {
        document.body.classList.remove("rtl")
      }
    }
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const contextValue = {
    language,
    setLanguage,
    isRTL,
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

