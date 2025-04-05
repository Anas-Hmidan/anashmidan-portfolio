"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import translations from "@/translations"

export default function Footer() {
  const { language, isRTL } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Use a safe way to access translations
  const t = mounted ? translations[language] : translations.en

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="py-8 bg-gray-900 border-t border-gray-800 relative z-10">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <div className={`mb-4 md:mb-0 ${isRTL ? "text-right" : ""}`}>
            <p className="text-xl font-bold">
              <span className="text-teal-400">A</span>nas <span className="text-teal-400">H</span>midan
            </p>
            <p className="text-gray-400 text-sm">IT Student | Information Systems Development</p>
          </div>

          <div className={`flex ${isRTL ? "space-x-reverse" : ""} space-x-4`}>
            <a href="https://github.com/Anas-Hmidan" className="text-gray-400 hover:text-teal-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/anas-hmidan"
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:anashmidan8@gmail.com"
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Anas Hmidan. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}

