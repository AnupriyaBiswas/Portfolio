import React from "react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Education from "./Education";
import Contact from "./Contact";
import Constellations from "./Constellations";

const Main = () => {
  return (
    <main className="w-full h-full scroll-smooth relative overflow-hidden bg-black">
      {/* Starfield + Falling stars are already part of your global background */}
      
      {/* Constellations Layer */}
      <Constellations />

      {/* Page Content */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Education />
      <Contact />
    </main>
  );
};

export default Main;
