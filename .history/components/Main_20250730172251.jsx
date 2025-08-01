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
      { x: 10, y: 10 },
      { x: 40, y: 60 },
      { x: 70, y: 20 },
      { x: 100, y: 60 },
      { x: 130, y: 30 },
      { x: 160, y: 70 },
      { x: 190, y: 40 },
    ],
  },
  {
    name: "Ursa Major",
    stars: [
      { x: 10, y: 30 },
      { x: 40, y: 40 },
      { x: 70, y: 35 },
      { x: 100, y: 55 },
      { x: 130, y: 45 },
      { x: 160, y: 30 },
      { x: 190, y: 25 },
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 10, y: 20 },
      { x: 40, y: 10 },
      { x: 70, y: 20 },
      { x: 100, y: 10 },
      { x: 130, y: 20 },
    ],
  },
  {
    name: "Perseus",
    stars: [
      { x: 10, y: 10 },
      { x: 30, y: 40 },
      { x: 60, y: 60 },
      { x: 90, y: 80 },
      { x: 120, y: 100 },
    ],
  },
];

const Main = () => {
  const [stars, setStars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);
  const [visibleConstellations, setVisibleConstellations] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate static stars
    const newStars = [];
    for (let i = 0; i < 300; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
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
    const showConstellation = () => {
      const index = Math.floor(Math.random() * constellationsData.length);
      const posX = Math.random() * 800; // keep within viewport
      const posY = Math.random() * 400;

      setVisibleConstellations([
        {
          ...constellationsData[index],
          posX,
          posY,
        },
      ]);
    };

    showConstellation(); // show initial
    const interval = setInterval(showConstellation, 7000);

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
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {visibleConstellations.map((constellation, idx) => (
          <g
            key={idx}
            opacity="0.4"
            transform={`translate(${constellation.posX},${constellation.posY}) scale(0.25)`}
            className="pointer-events-auto cursor-pointer"
            onMouseEnter={(e) => {
              setHovered(constellation.name);
              setTooltipPos({ x: e.clientX, y: e.clientY });
            }}
            onMouseMove={(e) =>
              setTooltipPos({ x: e.clientX, y: e.clientY })
            }
            onMouseLeave={() => setHovered(null)}
          >
            {constellation.stars.map((star, i) => (
              <circle
                key={i}
                cx={star.x}
                cy={star.y}
                r="2"
                fill="white"
              />
            ))}
            {/* Connect stars with faint lines */}
            <polyline
              points={constellation.stars.map((s) => `${s.x},${s.y}`).join(" ")}
              stroke="white"
              strokeOpacity="0.2"
              strokeWidth="1"
              fill="none"
            />
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute bg-black text-white px-2 py-1 text-xs rounded border border-white z-50"
          style={{ top: tooltipPos.y + 10, left: tooltipPos.x + 10 }}
        >
          {hovered}
        </div>
      )}

      {/* Sections */}
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
