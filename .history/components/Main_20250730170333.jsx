"use client";

import React, { useEffect, useState } from "react";

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
      "Cassiopeia, queen of Aethiopia, angered Poseidon... She sits on her throne in the sky.",
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
      }, Math.random() * 10000) // random delay up to 10s
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <main className="relative w-full h-full scroll-smooth bg-black text-white overflow-hidden">
      {/* Starfield layer (already in your code) */}
      
      {/* Constellations Layer */}
      <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
        {visibleConstellations.map((index) => {
          const c = constellations[index];
          return (
            <g key={c.name}>
              {/* Lines */}
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
                    className="opacity-70 animate-fade"
                  />
                );
              })}

              {/* Stars */}
              {c.points.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={3}
                  fill="white"
                  className="cursor-pointer pointer-events-auto animate-fade"
                  onClick={() => setSelectedConstellation(c)}
                  onMouseEnter={(e) => {
                    const tooltip = document.createElement("div");
                    tooltip.innerText = c.name;
                    tooltip.style.position = "fixed";
                    tooltip.style.left = `${e.clientX + 10}px`;
                    tooltip.style.top = `${e.clientY + 10}px`;
                    tooltip.style.padding = "4px 8px";
                    tooltip.style.background = "rgba(0,0,0,0.7)";
                    tooltip.style.borderRadius = "4px";
                    tooltip.style.fontSize = "12px";
                    tooltip.style.pointerEvents = "none";
                    tooltip.className = "constellation-tooltip";
                    document.body.appendChild(tooltip);
                  }}
                  onMouseLeave={() => {
                    document
                      .querySelectorAll(".constellation-tooltip")
                      .forEach((el) => el.remove());
                  }}
                />
              ))}
            </g>
          );
        })}
      </svg>

      {/* Modal for mythology */}
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
          animation: fade 8s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default Main;
