import React, { useEffect, useState } from "react";

const constellationData = [
  {
    name: "Orion",
    stars: [
      { x: 50, y: 10 }, { x: 60, y: 20 }, { x: 55, y: 30 },
      { x: 45, y: 30 }, { x: 40, y: 20 }, { x: 50, y: 40 },
      { x: 60, y: 50 }
    ]
  },
  {
    name: "Ursa Major",
    stars: [
      { x: 20, y: 20 }, { x: 30, y: 15 }, { x: 40, y: 25 },
      { x: 50, y: 35 }, { x: 60, y: 25 }, { x: 70, y: 20 }, { x: 80, y: 30 }
    ]
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 70, y: 60 }, { x: 75, y: 55 }, { x: 80, y: 60 },
      { x: 85, y: 55 }, { x: 90, y: 60 }
    ]
  },
  {
    name: "Perseus",
    stars: [
      { x: 30, y: 70 }, { x: 35, y: 75 }, { x: 40, y: 72 },
      { x: 45, y: 78 }, { x: 50, y: 74 }, { x: 55, y: 79 }
    ]
  }
];

const Background = () => {
  const [stars, setStars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);
  const [visibleConstellations, setVisibleConstellations] = useState([]);

  useEffect(() => {
    // Generate static stars
    const staticStars = Array.from({ length: 250 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      twinkle: Math.random() * 5
    }));
    setStars(staticStars);

    // Generate falling stars
    const falling = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 10
    }));
    setFallingStars(falling);

    // Show first constellation immediately
    setVisibleConstellations([constellationData[0]]);

    // Cycle through constellations
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % constellationData.length;
      setVisibleConstellations([constellationData[index]]);
    }, 12000); // each stays ~12s
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Static stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${5 + s.twinkle}s infinite ease-in-out`,
          }}
        />
      ))}

      {/* Falling stars */}
      {fallingStars.map((f) => (
        <div
          key={f.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: "2px",
            height: "2px",
            animation: `fall ${f.duration}s linear infinite`,
            animationDelay: `${f.delay}s`
          }}
        />
      ))}

      {/* Constellations */}
      {visibleConstellations.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          className="absolute animate-fade-in-out"
          style={{
            left: `${15 + Math.random() * 25}%`,
            top: `${15 + Math.random() * 25}%`,
            transform: "scale(0.8)",
          }}
        >
          <svg width="200" height="200" className="overflow-visible">
            {/* Draw constellation lines first (behind stars) */}
            {c.stars.map((star, j) =>
              j < c.stars.length - 1 ? (
                <line
                  key={`line-${j}`}
                  x1={star.x * 1.5}
                  y1={star.y * 1.5}
                  x2={c.stars[j + 1].x * 1.5}
                  y2={c.stars[j + 1].y * 1.5}
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1"
                />
              ) : null
            )}
            
            {/* Draw stars on top */}
            {c.stars.map((star, j) => (
              <circle
                key={j}
                cx={star.x * 1.5}
                cy={star.y * 1.5}
                r="3"
                fill="rgba(255, 255, 255, 0.95)"
                className="hover:fill-yellow-300 cursor-pointer transition-colors duration-300"
              >
                <title>{c.name}</title>
              </circle>
            ))}
          </svg>
        </div>
      ))}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes fall {
          0% { transform: translateY(-100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(-20px); opacity: 0; }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { opacity: 0; }
        }
        .animate-fade-in-out {
          animation: fadeInOut 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Background;