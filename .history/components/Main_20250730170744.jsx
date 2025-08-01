"use client";

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Education from "./Education";
import Contact from "./Contact";

const constellations = [
  {
    name: "Orion (The Hunter)",
    mythology:
      "Orion was a mighty hunter... Zeus placed Orion and the Scorpius in the sky.",
    points: [
      [200, 150],
      [220, 180],
      [240, 160],
      [260, 190],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  {
    name: "Ursa Major & Minor",
    mythology:
      "Callisto was turned into a bear by Hera... Zeus placed her and her son in the sky.",
    points: [
      [700, 100],
      [720, 120],
      [740, 110],
      [760, 130],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  {
    name: "Cassiopeia (The Queen)",
    mythology:
      "Cassiopeia angered Poseidon... She now sits in the sky on her throne.",
    points: [
      [400, 500],
      [420, 480],
      [440, 500],
      [460, 480],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  {
    name: "Perseus (The Hero)",
    mythology:
      "Perseus slew Medusa and rescued Andromeda... He holds Medusa’s head in the sky.",
    points: [
      [800, 400],
      [820, 420],
      [840, 410],
      [860, 430],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
];

const Main = () => {
  const [stars, setStars] = useState([]);
  const [visibleConstellations, setVisibleConstellations] = useState([]);
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [hoveredConstellation, setHoveredConstellation] = useState(null);

  useEffect(() => {
    // Generate falling stars
    const newStars = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        animationDelay: Math.random() * 5,
        animationDuration: 10 + Math.random() * 10,
      });
    }
    setStars(newStars);

    // Stagger constellation appearances
    const timers = constellations.map((_, index) =>
      setTimeout(() => {
        setVisibleConstellations((prev) => [...prev, index]);
      }, Math.random() * 10000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <main className="relative w-full h-full scroll-smooth bg-black text-white overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
              animation: `fall ${star.animationDuration}s linear infinite`,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Constellations */}
      <div className="absolute inset-0 z-10">
        <svg className="w-full h-full">
          {visibleConstellations.map((index) => {
            const c = constellations[index];
            return (
              <g
                key={c.name}
                className="opacity-50 hover:opacity-100 transition-opacity duration-500"
              >
                {c.lines.map(([start, end], i) => {
                  const [x1, y1] = c.points[start];
                  const [x2, y2] = c.points[end];
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="white"
                      strokeWidth="0.8"
                      className="animate-fade"
                    />
                  );
                })}
                {c.points.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={2}
                    fill="white"
                    className="cursor-pointer animate-fade"
                    onMouseEnter={() => setHoveredConstellation(c.name)}
                    onMouseLeave={() => setHoveredConstellation(null)}
                    onClick={() => setSelectedConstellation(c)}
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip */}
      {hoveredConstellation && (
        <div className="absolute z-30 bg-black/80 text-orange-300 text-sm px-2 py-1 rounded-md pointer-events-none"
          style={{ left: "50%", top: "10%", transform: "translateX(-50%)" }}
        >
          {hoveredConstellation}
        </div>
      )}

      {/* Page Content */}
      <div className="relative z-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Education />
        <Contact />
      </div>

      {/* Modal for Mythology */}
      {selectedConstellation && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-40"
          onClick={() => setSelectedConstellation(null)}
        >
          <div
            className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500 shadow-lg max-w-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              {selectedConstellation.name}
            </h3>
            <p className="text-gray-200">{selectedConstellation.mythology}</p>
            <button
              onClick={() => setSelectedConstellation(null)}
              className="mt-6 px-4 py-2 bg-orange-600 rounded-lg hover:bg-orange-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        @keyframes fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-fade {
          animation: fade 8s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default Main;
