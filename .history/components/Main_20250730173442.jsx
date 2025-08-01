import React, { useEffect, useState } from "react";

// Define constellation shapes
const constellations = [
  {
    name: "Orion",
    points: [
      [0, 0], [20, -40], [40, 0],
      [60, -20], [80, 20], [100, -10],
    ],
  },
  {
    name: "Ursa Major",
    points: [
      [0, 0], [20, -20], [40, -10],
      [60, -30], [80, -10], [100, 10], [120, -5],
    ],
  },
  {
    name: "Cassiopeia",
    points: [
      [0, 0], [20, -20], [40, 0], [60, -20], [80, 0],
    ],
  },
  {
    name: "Perseus",
    points: [
      [0, 0], [20, -20], [40, -5],
      [60, 15], [80, -10], [100, 20],
    ],
  },
];

export default function Constellations() {
  const [activeConstellations, setActiveConstellations] = useState([]);
  const [hoveredName, setHoveredName] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Random placement generator
  const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    scale: 0.25 + Math.random() * 0.15,
  });

  useEffect(() => {
    // Initialize with 2 constellations
    const initial = Array.from({ length: 2 }).map(() => {
      const c = constellations[Math.floor(Math.random() * constellations.length)];
      return { ...c, position: getRandomPosition(), id: Math.random() };
    });
    setActiveConstellations(initial);

    const interval = setInterval(() => {
      setActiveConstellations((prev) => {
        // Fade out oldest
        const newList = prev.slice(1);

        // Add a new one
        const newConst = constellations[Math.floor(Math.random() * constellations.length)];
        newList.push({ ...newConst, position: getRandomPosition(), id: Math.random() });

        return newList;
      });
    }, 25000); // stays for ~25s before replacement

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {activeConstellations.map((constellation) => (
          <g
            key={constellation.id}
            transform={`translate(${constellation.position.x}, ${constellation.position.y}) scale(${constellation.position.scale})`}
            className="transition-opacity duration-[3000ms] opacity-60 hover:opacity-100"
          >
            {constellation.points.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill="white"
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={(e) => {
                  setHoveredName(constellation.name);
                  setTooltipPos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => setHoveredName(null)}
              />
            ))}
            <polyline
              points={constellation.points.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke="white"
              strokeWidth="0.6"
              opacity="0.5"
            />
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredName && (
        <div
          className="absolute bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{ top: tooltipPos.y - 30, left: tooltipPos.x + 10 }}
        >
          {hoveredName}
        </div>
      )}
    </div>
  );
}
