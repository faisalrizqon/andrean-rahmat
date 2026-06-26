import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";

const Blog = dynamic(() => import("@/components/sections/Blog"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Portfolio />
        <Booking />
        <Contact />
        <Blog />
      </main>
      <Footer />
    </>
  );
}