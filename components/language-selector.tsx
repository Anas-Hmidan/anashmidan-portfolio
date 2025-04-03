"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { ChevronDown, Globe } from "lucide-react"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
  ]

  const toggleDropdown = () => setIsOpen(!isOpen)

  const selectLanguage = (code: "en" | "fr" | "ar") => {
    setLanguage(code)
    setIsOpen(false)
  }

  const getCurrentLanguageName = () => {
    return languages.find((lang) => lang.code === language)?.name || "English"
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-gray-300 hover:text-teal-400 transition-colors py-2 px-3 rounded-md hover:bg-gray-800/50"
      >
        <Globe size={16} />
        <span>{mounted ? getCurrentLanguageName() : "English"}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code as "en" | "fr" | "ar")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                language === lang.code ? "text-teal-400" : "text-gray-300"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

