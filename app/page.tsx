import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="max-w-5xl mx-auto">
         {/* Any additional spacing containers could go here, but sections already handle it */}
      </div>
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
