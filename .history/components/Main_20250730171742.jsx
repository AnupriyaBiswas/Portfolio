// D:\Programs\Projects\portfolio\components\Main.jsx
"use client";
import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Education from "./Education";
import Contact from "./Contact";

const Main = () => {
  const [stars, setStars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);

  useEffect(() => {
    // Static twinkling stars
    const newStars = [];
    for (let i = 0; i < 250; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.4,
        twinkleDuration: 3 + Math.random() * 4,
        twinkleDelay: Math.random() * 5,
      });
    }
    setStars(newStars);

    // Falling stars
    const newFalling = [];
    for (let i = 0; i < 40; i++) {
      newFalling.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 10,
      });
    }
    setFallingStars(newFalling);
  }, []);

  return (
    <main className="w-full h-full scroll-smooth relative bg-black text-white overflow-hidden">
      {/* Static Twinkling Stars */}
      <div className="absolute inset-0 z-0">
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
              animation: `twinkle ${star.twinkleDuration}s ease-in-out infinite`,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Falling Stars */}
      <div className="absolute inset-0 z-0">
        {fallingStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `fall ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Tiny Constellations */}
      <svg className="absolute inset-0 w-full h-full z-0">
        {/* Orion */}
        <g opacity="0.2" transform="scale(0.4) translate(200,200)">
          <circle cx="50" cy="50" r="1.5" fill="white" />
          <circle cx="80" cy="100" r="1.5" fill="white" />
          <circle cx="110" cy="50" r="1.5" fill="white" />
          <circle cx="140" cy="100" r="1.5" fill="white" />
          <circle cx="170" cy="50" r="1.5" fill="white" />
          <circle cx="200" cy="100" r="1.5" fill="white" />
          <circle cx="230" cy="50" r="1.5" fill="white" />
        </g>

        {/* Ursa Major */}
        <g opacity="0.15" transform="scale(0.35) translate(1200,200)">
          <circle cx="50" cy="50" r="1.5" fill="white" />
          <circle cx="80" cy="60" r="1.5" fill="white" />
          <circle cx="110" cy="70" r="1.5" fill="white" />
          <circle cx="140" cy="90" r="1.5" fill="white" />
          <circle cx="170" cy="80" r="1.5" fill="white" />
          <circle cx="200" cy="60" r="1.5" fill="white" />
          <circle cx="230" cy="50" r="1.5" fill="white" />
        </g>

        {/* Cassiopeia */}
        <g opacity="0.15" transform="scale(0.3) translate(800,600)">
          <circle cx="50" cy="50" r="1.5" fill="white" />
          <circle cx="80" cy="40" r="1.5" fill="white" />
          <circle cx="110" cy="50" r="1.5" fill="white" />
          <circle cx="140" cy="40" r="1.5" fill="white" />
          <circle cx="170" cy="50" r="1.5" fill="white" />
        </g>

        {/* Perseus */}
        <g opacity="0.15" transform="scale(0.35) translate(1400,800)">
          <circle cx="50" cy="50" r="1.5" fill="white" />
          <circle cx="80" cy="70" r="1.5" fill="white" />
          <circle cx="110" cy="90" r="1.5" fill="white" />
          <circle cx="140" cy="110" r="1.5" fill="white" />
          <circle cx="170" cy="130" r="1.5" fill="white" />
        </g>
      </svg>

      {/* Content Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Education />
      <Contact />

      {/* Animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </main>
  );
};

export default Main;
