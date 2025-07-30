// D:\Programs\Projects\portfolio\components\Main.jsx
import React from "react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Education from "./Education";
import Contact from "./Contact";
import Image from "next/image";

const Main = () => {
  return (
    <main className="w-full h-full scroll-smooth relative">
      {/* Profile Tag */}
      <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-slate-800 text-white px-3 py-1 rounded-full shadow-lg">
        <Image
          src="/assets/profile.png" // place your image in /public/assets/profile.png
          alt="Profile"
          width={28}
          height={28}
          className="rounded-full"
        />
        <span className="text-sm font-medium">Sou</span>
        <button
          className="ml-1 text-gray-300 hover:text-white text-lg leading-none"
          onClick={(e) => e.currentTarget.parentElement.remove()}
        >
          &times;
        </button>
      </div>

      {/* Website Sections */}
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
