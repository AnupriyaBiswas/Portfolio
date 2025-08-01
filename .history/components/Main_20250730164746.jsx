"use client";

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Education from "./Education";
import Contact from "./Contact";

const Main = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 50; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4, // larger for debugging
        opacity: 1,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <main className="relative bg-black text-white scroll-smooth min-h-screen">
      {/* DEBUG Starfield */}
      <div className="fixed inset-0 z-[9999] pointer-events-none bg-black">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-red-500" // bright red for visibility
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      {/* Sections */}
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
