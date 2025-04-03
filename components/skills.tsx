"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Code2, Database, Globe, Layers, Server, Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import translations from "@/translations"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { language, isRTL } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Use a safe way to access translations
  const t = mounted ? translations[language] : translations.en

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Split the "My Skills" text to apply different styles
  const mySkillsText = t.mySkills.split(" ")
  const firstWord = mySkillsText[0]
  const restWords = mySkillsText.slice(1).join(" ")

  const skills = [
    {
      category: t.frontendDevelopment,
      icon: <Globe className="w-10 h-10 text-teal-400" />,
      technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "Angular", "Vue.js", "Bootstrap", "Tailwind CSS"],
    },
    {
      category: t.backendDevelopment,
      icon: <Server className="w-10 h-10 text-teal-400" />,
      technologies: ["Node.js", "Express.js", "Spring Boot", "RESTful APIs", "Laravel"],
    },
    {
      category: t.databaseManagement,
      icon: <Database className="w-10 h-10 text-teal-400" />,
      technologies: ["MySQL", "MongoDB", "SQL Server", "Database Design"],
    },
    {
      category: t.programmingLanguages,
      icon: <Code2 className="w-10 h-10 text-teal-400" />,
      technologies: ["JavaScript", "TypeScript", "Java", "C#", "PHP", "Python"],
    },
    {
      category: t.languages,
      icon: <Languages className="w-10 h-10 text-teal-400" />,
      technologies: ["Arabic (Native)", "English (B2)", "French (B1-B2)"],
    },
    {
      category: t.otherSkills,
      icon: <Layers className="w-10 h-10 text-teal-400" />,
      technologies: ["Git", "GitHub", "Object-Oriented Programming", "Postman", "Vite"],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-7xl mx-auto" // Increased from max-w-6xl
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {firstWord} <span className="text-teal-400">{restWords}</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-300 text-center max-w-4xl mx-auto mb-12">
            {t.skillsDescription}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-teal-500/50 transition-all duration-300 ${isRTL ? "text-right" : ""}`}
              >
                <div className={`flex items-center mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {skill.icon}
                  <h3 className={`text-xl font-semibold ${isRTL ? "mr-3" : "ml-3"}`}>{skill.category}</h3>
                </div>

                <div className={`flex flex-wrap gap-2 mt-4 ${isRTL ? "justify-end" : ""}`}>
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-700/50 text-sm rounded-full text-teal-300 border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

