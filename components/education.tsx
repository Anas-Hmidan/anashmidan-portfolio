"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar, MapPin, Briefcase } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import translations from "@/translations"

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
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

  // Custom title rendering for Education & Experience
  const renderTitle = () => {
    if (language === "en") {
      return (
        <>
          Education <span className="text-teal-400">&</span> Experience
        </>
      )
    } else if (language === "fr") {
      // For French, we'll assume the format is "Formation & Expérience"
      return (
        <>
          Formation <span className="text-teal-400">&</span> Expérience
        </>
      )
    } else if (language === "ar") {
      // For Arabic, we'll assume the format is "التعليم والخبرة"
      // We'll highlight only the "و" which is the Arabic equivalent of "&"
      const parts = t.educationExperience.split("و")
      if (parts.length > 1) {
        return (
          <>
            {parts[0]}
            <span className="text-teal-400">و</span>
            {parts[1]}
          </>
        )
      }
    }

    // Fallback for any other language or format
    return t.educationExperience
  }

  return (
    <section id="education" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto" // Increased from max-w-4xl
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {renderTitle()}
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-300 text-center max-w-4xl mx-auto mb-12">
            {t.educationDescription}
          </motion.p>

          <div
            className={`relative ${isRTL ? "border-r-2 pr-6 sm:pr-8 mr-2 sm:mr-4" : "border-l-2 pl-6 sm:pl-8 ml-2 sm:ml-4"} border-teal-500/30 space-y-8 sm:space-y-12`}
          >
            <motion.div variants={itemVariants} className="relative">
              <div
                className={`absolute ${isRTL ? "-right-[42px]" : "-left-[42px]"} bg-gray-900 p-1 rounded-full border-2 border-teal-500`}
              >
                <GraduationCap className="w-6 h-6 text-teal-400" />
              </div>

              <div
                className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 ${isRTL ? "text-right" : ""}`}
              >
                <h3 className="text-xl font-semibold mb-2">{t.bachelorDegree}</h3>
                <h4 className="text-teal-400 mb-4">
                  <a
                    href="http://www.isetjb.rnu.tn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {t.isetDjerba}
                  </a>
                </h4>

                <div className={`flex flex-wrap gap-4 text-gray-300 mb-4 ${isRTL ? "justify-end" : ""}`}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>September 2023 - Present</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    <span>Djerba, Tunisia</span>
                  </div>
                </div>

                <p className="text-gray-300">{t.educationDescription1}</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div
                className={`absolute ${isRTL ? "-right-[42px]" : "-left-[42px]"} bg-gray-900 p-1 rounded-full border-2 border-teal-500`}
              >
                <Briefcase className="w-6 h-6 text-teal-400" />
              </div>

              <div
                className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 ${isRTL ? "text-right" : ""}`}
              >
                <h3 className="text-xl font-semibold mb-2">{t.intern}</h3>
                <h4 className="text-teal-400 mb-4">
                  <a
                    href="https://designet-tn.com/agency/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {t.designetWebAgency}
                  </a>
                </h4>

                <div className={`flex flex-wrap gap-4 text-gray-300 mb-4 ${isRTL ? "justify-end" : ""}`}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>January - February 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    <span>Nabeul, Tunisia</span>
                  </div>
                </div>

                <p className="text-gray-300">{t.internDescription1}</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div
                className={`absolute ${isRTL ? "-right-[42px]" : "-left-[42px]"} bg-gray-900 p-1 rounded-full border-2 border-teal-500`}
              >
                <Briefcase className="w-6 h-6 text-teal-400" />
              </div>

              <div
                className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 ${isRTL ? "text-right" : ""}`}
              >
                <h3 className="text-xl font-semibold mb-2">{t.intern}</h3>
                <h4 className="text-teal-400 mb-4">
                  <a
                    href="https://designet-tn.com/agency/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {t.designetWebAgency}
                  </a>
                </h4>

                <div className={`flex flex-wrap gap-4 text-gray-300 mb-4 ${isRTL ? "justify-end" : ""}`}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>January - February 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    <span>Nabeul, Tunisia</span>
                  </div>
                </div>

                <p className="text-gray-300">{t.internDescription2}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

