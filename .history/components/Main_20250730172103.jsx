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

const constellationsData = [
  {
    name: "Orion",
    stars: [
      { x: 50, y: 50 },
      { x: 80, y: 100 },
      { x: 110, y: 50 },
      { x: 140, y: 100 },
      { x: 170, y: 50 },
      { x: 200, y: 100 },
      { x: 230, y: 50 },
    ],
  },
  {
    name: "Ursa Major",
    stars: [
      { x: 50, y: 50 },
      { x: 80, y: 60 },
      { x: 110, y: 70 },
      { x: 140, y: 90 },
      { x: 170, y: 80 },
      { x: 200, y: 60 },
      { x: 230, y: 50 },
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 50, y: 50 },
      { x: 80, y: 40 },
      { x: 110, y: 50 },
      { x: 140, y: 40 },
      { x: 170, y: 50 },
    ],
  },
  {
    name: "Perseus",
    stars: [
      { x: 50, y: 50 },
      { x: 80, y: 70 },
      { x: 110, y: 90 },
      { x: 140, y: 110 },
      { x: 170, y: 130 },
    ],
  },
];

const Main = () => {
  const [stars, setStars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);
  const [visibleConstellations, setVisibleConstellations] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    // Generate static stars
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

  useEffect(() => {
    // Randomly show constellations
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * constellationsData.length);
      setVisibleConstellations([constellationsData[index]]);
    }, 8000); // change constellation every 8s
    setVisibleConstellations([constellationsData[0]]); // start with one

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full h-full scroll-smooth relative bg-black text-white overflow-hidden">
      {/* Static Stars */}
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

      {/* Constellations */}
      <svg className="absolute inset-0 w-full h-full z-0">
        {visibleConstellations.map((constellation, idx) => (
          <g
            key={idx}
            opacity="0.2"
            transform={`scale(0.15) translate(${200 + idx * 300},${
              200 + idx * 200
            })`}
            onMouseEnter={() => setHovered(constellation.name)}
            onMouseLeave={() => setHovered(null)}
          >
            {constellation.stars.map((star, i) => (
              <circle
                key={i}
                cx={star.x}
                cy={star.y}
                r="1.2"
                fill="white"
                className="transition-opacity duration-700"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute top-10 left-10 bg-black text-white px-3 py-1 text-xs rounded border border-white z-50">
          {hovered}
        </div>
      )}

      {/* Page Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Education />
      <Contact />

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
