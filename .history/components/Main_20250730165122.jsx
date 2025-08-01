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
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1, // 1–3px
      });
    }
    setStars(newStars);
  }, []);

  return (
    <main className="relative bg-black text-white scroll-smooth min-h-screen">
      {/* Starfield Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "white",
              boxShadow: "0 0 6px rgba(255,255,255,0.9)",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Education />
        <Contact />
      </div>
    </main>
  );
};

export default Main;
