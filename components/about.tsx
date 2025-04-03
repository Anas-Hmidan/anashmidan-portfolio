"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import translations from "@/translations"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  // Split the "About Me" text to apply different styles
  const aboutMeText = t.aboutMe.split(" ")
  const firstWord = aboutMeText[0]
  const restWords = aboutMeText.slice(1).join(" ")

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto" // Increased from max-w-4xl
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {firstWord} <span className="text-teal-400">{restWords}</span>
          </motion.h2>

          <div className={`grid md:grid-cols-2 gap-10 items-center ${isRTL ? "dir-rtl" : ""}`}>
            <motion.div variants={itemVariants} className={`relative ${isRTL ? "order-last" : ""}`}>
              <div className="w-full h-80 bg-gradient-to-tr from-teal-500/20 to-purple-500/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/images/anas-profile.png"
                    alt="Anas Hmidan"
                    className="w-64 h-64 object-cover rounded-full border-4 border-teal-400"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className={isRTL ? "text-right" : ""}>
              <h3 className="text-2xl font-semibold mb-4">
                {t.itStudentDeveloper.split("&")[0]} <span className="text-teal-400">&</span>{" "}
                {t.itStudentDeveloper.split("&")[1]}
              </h3>
              <p className="text-gray-300 mb-6">{t.aboutDescription1}</p>
              <p className="text-gray-300 mb-6">{t.aboutDescription2}</p>

              <div className={`flex flex-wrap gap-4 ${isRTL ? "justify-end" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                  <span className="text-gray-300">{t.available}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

