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
      "Orion was a mighty hunter... Zeus placed Orion and the Scorpion (Scorpius) in the sky.",
    points: [
      [100, 200],
      [150, 300],
      [200, 250],
      [250, 350],
      [300, 200],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
    ],
  },
  {
    name: "Ursa Major & Ursa Minor",
    mythology:
      "Callisto was turned into a bear by Hera... Zeus placed her and her son in the sky.",
    points: [
      [500, 100],
      [550, 150],
      [600, 120],
      [650, 200],
      [700, 180],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    name: "Cassiopeia (The Queen)",
    mythology:
      "Cassiopeia angered Poseidon with her vanity... She now sits in the sky on her throne.",
    points: [
      [200, 500],
      [250, 480],
      [300, 500],
      [350, 520],
      [400, 500],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    name: "Perseus (The Hero)",
    mythology:
      "Perseus slew Medusa and rescued Andromeda... He holds Medusa’s head in the sky.",
    points: [
      [700, 400],
      [750, 450],
      [800, 420],
      [850, 460],
      [900, 430],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
];

const Main = () => {
  const [visibleConstellations, setVisibleConstellations] = useState([]);
  const [selectedConstellation, setSelectedConstellation] = useState(null);

  useEffect(() => {
    const timers = constellations.map((_, index) =>
      setTimeout(() => {
        setVisibleConstellations((prev) => [...prev, index]);
      }, Math.random() * 8000) // appear over first 8 seconds
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <main className="relative w-full h-full scroll-smooth bg-black text-white overflow-hidden">
      {/* Background Constellations Layer */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full">
          {visibleConstellations.map((index) => {
            const c = constellations[index];
            return (
              <g key={c.name}>
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
                      strokeWidth="1"
                      className="opacity-60 animate-fade"
                    />
                  );
                })}
                {c.points.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={3}
                    fill="white"
                    className="cursor-pointer pointer-events-auto animate-fade"
                    onClick={() => setSelectedConstellation(c)}
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Page Content Above */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Education />
        <Contact />
      </div>

      {/* Mythology Modal */}
      {selectedConstellation && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50"
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

      {/* Fade animation */}
      <style jsx global>{`
        @keyframes fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-fade {
          animation: fade 10s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default Main;
