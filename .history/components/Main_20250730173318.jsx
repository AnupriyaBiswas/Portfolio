import React, { useEffect, useState } from "react";

const constellations = [
  {
    name: "Orion",
    points: [
      [0, 0], [20, -40], [40, 0], // Orion’s Belt & outline
      [60, -20], [80, 20]
    ],
  },
  {
    name: "Ursa Major",
    points: [
      [0, 0], [20, -20], [40, -10], [60, -30],
      [80, -10], [100, 10], [120, -5]
    ],
  },
  {
    name: "Cassiopeia",
    points: [[0, 0], [20, -20], [40, 0], [60, -20], [80, 0]],
  },
  {
    name: "Perseus",
    points: [[0, 0], [20, -20], [40, -5], [60, 15], [80, -10], [100, 20]],
  },
];

export default function StarfieldWithConstellations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConstellation, setShowConstellation] = useState(true);
  const [hoveredName, setHoveredName] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cycle = setInterval(() => {
      setShowConstellation(false); // fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % constellations.length);
        setShowConstellation(true); // fade in
      }, 2000); // wait for fade out
    }, 10000); // each constellation visible for 10s

    return () => clearInterval(cycle);
  }, []);

  const constellation = constellations[currentIndex];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          className={`transition-opacity duration-2000 ${
            showConstellation ? "opacity-50" : "opacity-0"
          }`}
          transform={`translate(200,200) scale(0.4)`} // adjust scale for size
        >
          {constellation.points.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="white"
              className="cursor-pointer"
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
            strokeWidth="0.5"
            opacity="0.6"
          />
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredName && (
        <div
          className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow"
          style={{ top: tooltipPos.y - 30, left: tooltipPos.x + 10 }}
        >
          {hoveredName}
        </div>
      )}
    </div>
  );
}
