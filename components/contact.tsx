"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Mail, Linkedin, Github } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import translations from "@/translations"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "", // Empty default value
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [subjectError, setSubjectError] = useState(false)
  const { language, isRTL } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // EmailJS configuration with your provided credentials
  const serviceId = "service_lc8r98s"
  const templateId = "template_nfssu9h"
  const publicKey = "Sn7xWqNMWS5O_qDJQ"

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
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  // Split the "Get In Touch" text to apply different styles
  const getTouchText = t.getInTouch.split(" ")
  const firstWord = getTouchText[0]
  const restWords = getTouchText.slice(1).join(" ")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when subject is selected
    if (name === "subject" && value) {
      setSubjectError(false)
    }
  }

  // Get the selected subject label for the email
  const getSelectedSubjectLabel = () => {
    if (!formData.subject) return ""
    const option = t.subjectOptions.find((opt) => opt.value === formData.subject)
    return option ? option.label : ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate subject selection
    if (!formData.subject) {
      setSubjectError(true)
      return
    }

    // Reset states
    setSubmitError(false)
    setIsSubmitting(true)

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: `New Message from My Portfolio! - ${getSelectedSubjectLabel()}`,
        message: formData.message,
        to_email: "hmidananas@DJERBA.r-iset.tn",
      }

      // Initialize EmailJS if not already initialized
      if (!window.emailjs) {
        await emailjs.init(publicKey)
      }

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams)

      // Success handling
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Email sending failed:", error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-black">
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
            {t.contactDescription}
          </motion.p>

          <div className={`grid md:grid-cols-2 gap-10 ${isRTL ? "dir-rtl" : ""}`}>
            <motion.div variants={itemVariants} className={isRTL ? "text-right" : ""}>
              <h3 className="text-2xl font-semibold mb-6">{t.contactInformation}</h3>

              <div className="space-y-6">
                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{t.email}</h4>
                    <a
                      href="mailto:hmidananas@DJERBA.r-iset.tn"
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      hmidananas@DJERBA.r-iset.tn
                    </a>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <Linkedin className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">LinkedIn</h4>
                    <a
                      href="https://www.linkedin.com/in/anas-hmidan"
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      linkedin.com/in/anas-hmidan
                    </a>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <Github className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">GitHub</h4>
                    <a
                      href="https://github.com/Anas-Hmidan"
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      github.com/Anas-Hmidan
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className={isRTL ? "text-right" : ""}>
              <h3 className="text-2xl font-semibold mb-6">{t.sendMessage}</h3>

              {mounted ? (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        {t.yourName}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${isRTL ? "text-right" : ""}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        {t.yourEmail}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${isRTL ? "text-right" : ""}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      {t.subject}
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-800/50 border ${subjectError ? "border-red-500" : "border-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none ${isRTL ? "text-right" : ""} ${!formData.subject ? "text-gray-500" : "text-white"}`}
                      >
                        <option value="" disabled>
                          {t.selectSubject}
                        </option>
                        {t.subjectOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-gray-800 text-white py-2">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    {subjectError && <p className="mt-1 text-sm text-red-500">{t.subjectRequired}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      {t.yourMessage}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${isRTL ? "text-right" : ""}`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${isRTL ? "mr-auto" : "ml-auto"}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        {t.send}
                      </>
                    )}
                  </button>

                  {submitSuccess && (
                    <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                      {t.successMessage}
                    </div>
                  )}

                  {submitError && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                      {t.errorMessage || "There was an error sending your message. Please try again later."}
                    </div>
                  )}
                </form>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

