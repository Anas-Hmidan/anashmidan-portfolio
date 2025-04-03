"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import translations from "@/translations"
import LanguageSelector from "./language-selector"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { language, isRTL } = useLanguage()

  // Use a safe way to access translations
  const t = mounted ? translations[language] : translations.en

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: t.home, href: "#home" },
    { name: t.about, href: "#about" },
    { name: t.skills, href: "#skills" },
    { name: t.projects, href: "#projects" },
    { name: t.education, href: "#education" },
    { name: t.contact, href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div
        className={`container mx-auto px-4 max-w-7xl flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="text-xl font-bold">
          <span className="text-teal-400">A</span>nas <span className="text-teal-400">H</span>midan
        </motion.div>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex space-x-8 ${isRTL ? "space-x-reverse" : ""}`}>
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <LanguageSelector />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <LanguageSelector />
          <button className="text-white ml-4" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 1, height: "auto" }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-black/95 backdrop-blur-md"
        >
          <div className={`container mx-auto px-4 py-4 flex flex-col space-y-4 ${isRTL ? "items-end" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-gray-300 hover:text-teal-400 transition-colors py-2 border-b border-gray-800 ${isRTL ? "text-right w-full" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}

