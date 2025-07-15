// D:\Programs\Projects\portfolio\components\Main.jsx
import React from "react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Contact from "./Contact";

const Main = () => {
  return (
    <main className="w-full h-full scroll-smooth">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Contact />
    </main>
  );
};

export default Main;
