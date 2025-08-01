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

const constellations = [
  {
    name: "Orion",
    mythology:
      "Orion was a mighty hunter. Gaia sent a scorpion to kill him. Zeus placed Orion and the Scorpius in the sky, forever chasing each other.",
    mainStars: [
      [200, 150],
      [230, 190],
      [260, 160],
      [280, 200],
      [300, 170],
      [320, 210],
      [340, 180],
    ],
    fillerCount: 20, // scaled from 81
  },
  {
    name: "Ursa Major",
    mythology:
      "Callisto, transformed into a bear by Hera, was almost slain by her son Arcas. Zeus placed them as Ursa Major and Ursa Minor in the heavens.",
    mainStars: [
      [600, 200],
      [630, 220],
      [660, 240],
      [690, 260],
      [720, 240],
      [740, 220],
      [770, 200],
    ],
    fillerCount: 30, // scaled from ~200
  },
  {
    name: "Cassiopeia",
    mythology:
      "Cassiopeia boasted of her beauty, angering Poseidon. She sits in the sky on her throne, sometimes upside down as punishment for her vanity.",
    mainStars: [
      [400, 400],
      [430, 380],
      [460, 400],
      [490, 380],
      [520, 400],
    ],
    fillerCount: 25, // scaled from 157
  },
  {
    name: "Perseus",
    mythology:
      "Perseus, slayer of Medusa, rescued Andromeda from Cetus. He is shown holding Medusa’s head, with Algol as the Demon Star.",
    mainStars: [
      [700, 500],
      [730, 520],
      [760, 540],
      [780, 560],
      [810, 580],
    ],
    fillerCount: 15, // scaled from 65
  },
];

const Main = () => {
  const [stars, setStars] = useState([]);
  const [hoveredConstellation, setHoveredConstellation] = useState(null);
  const [selectedConstellation, setSelectedConstellation] = useState(null);

  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 300; i++) {
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
  }, []);

  return (
    <main className="w-full h-full scroll-smooth relative bg-black text-white">
      {/* Starfield */}
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

      {/* Constellations */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {constellations.map((constellation) => (
          <g key={constellation.name}>
            {/* Main Stars */}
            {constellation.mainStars.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={3}
                fill="white"
                className="cursor-pointer pointer-events-auto"
                opacity={0.9}
                onMouseEnter={(e) =>
                  setHoveredConstellation({
                    name: constellation.name,
                    x: e.clientX,
                    y: e.clientY,
                  })
                }
                onMouseLeave={() => setHoveredConstellation(null)}
                onClick={() =>
                  setSelectedConstellation({
                    name: constellation.name,
                    mythology: constellation.mythology,
                  })
                }
              />
            ))}
            {/* Filler Stars */}
            {Array.from({ length: constellation.fillerCount }).map((_, i) => {
              const base = constellation.mainStars[0];
              const x = base[0] + Math.random() * 120 - 60;
              const y = base[1] + Math.random() * 120 - 60;
              return (
                <circle
                  key={`filler-${i}`}
                  cx={x}
                  cy={y}
                  r={1}
                  fill="white"
                  opacity={0.4}
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredConstellation && (
        <div
          className="absolute bg-black/80 text-white text-xs px-2 py-1 rounded-md border border-gray-500"
          style={{
            left: hoveredConstellation.x + 10,
            top: hoveredConstellation.y + 10,
            zIndex: 50,
          }}
        >
          {hoveredConstellation.name}
        </div>
      )}

      {/* Mythology Card */}
      {selectedConstellation && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setSelectedConstellation(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            className="bg-gray-900 text-white p-6 rounded-lg max-w-md shadow-xl border border-orange-600 relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-3 text-orange-400">
              {selectedConstellation.name}
            </h3>
            <p className="text-sm leading-relaxed">
              {selectedConstellation.mythology}
            </p>
            <button
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-white"
              onClick={() => setSelectedConstellation(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

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
      `}</style>
    </main>
  );
};

export default Main;
