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
    for (let i = 0; i < 220; i++) {  // increased from 150 → 220
      newStars.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1.5, // slightly bigger min size
        opacity: Math.random() * 0.6 + 0.4, // brighter: 0.4 - 1.0
        delay: Math.random() * 10,
        fallDuration: 20 + Math.random() * 15, // a bit faster
        twinkleDuration: 4 + Math.random() * 6, // twinkle quicker
      });
    }
    setStars(newStars);
  }, []);

  return (
    <main className="relative w-full h-full scroll-smooth">
      {/* Starfield with animation */}
      <div className="fixed inset-0 bg-black z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white shadow-md"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 4}px rgba(255,255,255,0.8)`, // glow effect
              animation: `
                fall ${star.fallDuration}s linear infinite,
                twinkle ${star.twinkleDuration}s ease-in-out infinite
              `,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Content */}
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
