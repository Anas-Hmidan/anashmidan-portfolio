"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Maximize2, X, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import translations from "@/translations"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDemoAlert, setShowDemoAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  // Split the "My Projects" text to apply different styles
  const myProjectsText = t.myProjects.split(" ")
  const firstWord = myProjectsText[0]
  const restWords = myProjectsText.slice(1).join(" ")

  const handleDemoClick = (e, project) => {
    e.preventDefault()

    if (project.title === "Find A Ride") {
      setAlertMessage(t.checkGithubInstead)
      setShowDemoAlert(true)
    } else if (project.title === "DigiCamp") {
      setAlertMessage(t.checkGithubInstead)
      setShowDemoAlert(true)
    } else if (project.title === "ProFellah") {
      setAlertMessage(t.projectInPlanning)
      setShowDemoAlert(true)
    } else {
      window.open(project.demo, "_blank")
    }
  }

  const projects = [
    {
      title: "Adghal AI",
      description: t.adghalAIDescription,
      image: "/images/adghal-ai.png",
      technologies: ["React.js", "Node.js", "HuggingFace API", "DuckDuckGo API"],
      github: "https://github.com/Anas-Hmidan/adghal-ai",
      demo: "https://adghal-ai.vercel.app/",
    },
    {
      title: "Find A Ride",
      description: t.findARideDescription,
      image: "/images/find-a-ride.png",
      technologies: ["Angular", "Spring Boot", "RESTful APIs", "Postman"],
      github: "https://github.com/Anas-Hmidan/Perfectionnement",
      demo: "#",
    },
    {
      title: "DigiCamp",
      description: t.digiCampDescription,
      image: "/images/DigiCamp.jpeg",
      technologies: ["Vue.js", "Node.js", "Flutter", "Vite", "Tailwind CSS", "Three.js"],
      github: "https://github.com/Anas-Hmidan/DigiCamp",
      demo: "#",
      status: t.underConstruction,
      role: t.teamLeader,
    },
    {
      title: "ProFellah",
      description: t.proFellahDescription,
      image: "/images/ProFellah.jpeg",
      technologies: ["Flutter", "Machine Learning", "Data Analytics", "REST APIs"],
      github: "#",
      demo: "#",
      status: t.plannedProject,
      role: t.teamLeader,
      disabled: true,
    },
  ]

  return (
    <section id="projects" className="py-20 bg-black">
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
            {t.projectsDescription}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-900/50 rounded-lg overflow-hidden group"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.status && (
                    <div className="absolute top-4 right-4 bg-teal-500/80 text-white text-xs px-2 py-1 rounded-full">
                      {project.status}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className={`flex ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                          {project.github && project.github !== "#" && !project.disabled && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-teal-400 transition-colors"
                            >
                              <Github size={20} />
                            </a>
                          )}
                          {project.github && project.github === "#" && (
                            <span className="text-gray-500 cursor-not-allowed">
                              <Github size={20} />
                            </span>
                          )}
                          {project.demo && project.demo !== "#" && !project.disabled && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-teal-400 transition-colors"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                          {project.demo && project.demo === "#" && (
                            <a
                              href="#"
                              onClick={(e) => handleDemoClick(e, project)}
                              className={`${project.disabled ? "text-gray-500 cursor-not-allowed" : "text-white hover:text-teal-400 transition-colors"}`}
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-white hover:text-teal-400 transition-colors"
                        >
                          <Maximize2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`p-6 ${isRTL ? "text-right" : ""}`}>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  {project.role && (
                    <div className="mb-2">
                      <span className="text-teal-400 text-sm font-medium">{project.role}</span>
                    </div>
                  )}
                  <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : ""}`}>
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-800 text-xs rounded text-teal-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`bg-gray-900 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto ${isRTL ? "text-right" : ""}`}
          >
            <div className="relative">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              {selectedProject.status && (
                <div className="absolute top-4 left-4 bg-teal-500/80 text-white px-3 py-1 rounded-full">
                  {selectedProject.status}
                </div>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:text-teal-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{selectedProject.title}</h3>
              {selectedProject.role && (
                <div className="mb-4">
                  <span className="text-teal-400 font-medium">{selectedProject.role}</span>
                </div>
              )}
              <p className="text-gray-300 mb-6">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">{t.technologiesUsed}</h4>
                <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : ""}`}>
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800 text-sm rounded-full text-teal-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`flex ${isRTL ? "space-x-reverse space-x-4 justify-end" : "space-x-4"}`}>
                {selectedProject.github && selectedProject.github !== "#" && !selectedProject.disabled && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                )}
                {selectedProject.github && selectedProject.github === "#" && (
                  <button
                    disabled
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </button>
                )}
                {selectedProject.demo && selectedProject.demo !== "#" && !selectedProject.disabled && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>{t.liveDemo}</span>
                  </a>
                )}
                {selectedProject.demo && selectedProject.demo === "#" && (
                  <button
                    onClick={(e) => handleDemoClick(e, selectedProject)}
                    className={`flex items-center gap-2 px-4 py-2 ${
                      selectedProject.disabled
                        ? "bg-teal-600/50 text-gray-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700 text-white"
                    } rounded-lg transition-colors`}
                    disabled={selectedProject.disabled}
                  >
                    <ExternalLink size={18} />
                    <span>{t.liveDemo}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Demo Alert Modal */}
      {showDemoAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-lg p-6 max-w-md w-full text-center"
          >
            <div className="flex justify-center mb-4">
              <AlertTriangle size={48} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{t.demoNotAvailable}</h3>
            <p className="text-gray-300 mb-6">{alertMessage}</p>
            <button
              onClick={() => setShowDemoAlert(false)}
              className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
            >
              {t.understood}
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}

