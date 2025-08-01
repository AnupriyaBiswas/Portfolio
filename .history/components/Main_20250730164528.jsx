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
    console.log("Generating stars..."); // debug log
    const newStars = [];
    for (let i = 0; i < 80; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2, // slightly bigger for testing
        opacity: Math.random() * 0.8 + 0.2,
        animationDelay: Math.random() * 5,
        fallDuration: 15 + Math.random() * 10,
        twinkleDuration: 4 + Math.random() * 4,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <main className="relative bg-black text-white overflow-hidden scroll-smooth">
      {/* Stars Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `
                fall ${star.fallDuration}s linear infinite,
                twinkle ${star.twinkleDuration}s ease-in-out infinite
              `,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Global Keyframes */}
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
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>

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
