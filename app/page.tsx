import { Suspense } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Loading from "@/components/loading"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  )
}

