import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  FRONTEND: { icon: "skill1.png", angle: 0 },
  BACKEND: { icon: "skill2.png", angle: 60 },
  "AI / ML": { icon: "skill3.png", angle: 120 },
  DATABASE: { icon: "skill4.png", angle: 180 },
  TOOLS: { icon: "skill5.png", angle: 240 },
  SYSTEMS: { icon: "skill6.png", angle: 300 },
};

const Skills = () => {
  const [stars, setStars] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [orbitRadii, setOrbitRadii] = useState({ radiusX: 480, radiusY: 120 });
  const sectionRef = useRef(null);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // SSR-safe orbit radius handling
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setOrbitRadii({ radiusX: 200, radiusY: 120 });
      } else if (width < 768) {
        setOrbitRadii({ radiusX: 300, radiusY: 140 });
      } else if (width < 1024) {
        setOrbitRadii({ radiusX: 400, radiusY: 160 });
      } else {
        setOrbitRadii({ radiusX: 500, radiusY: 180 });
      }
    };

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Planet rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.06);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="skills"
        className="min-h-screen bg-black text-white relative overflow-hidden w-screen"
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden z-20">
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
                animation: `fall ${15 + Math.random() * 10}s linear infinite`,
                animationDelay: `${star.animationDelay}s`,
              }}
            />
          ))}
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes fall {
            0% {
              transform: translateY(-100vh);
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
          @keyframes twinkle {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.9;
            }
          }
        `}</style>

        {/* 🪐 Heading */}
        <div className="pt-36 pb-12 text-center z-10 relative">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold">
            <span className="text-orange-500">TECH</span>{" "}
            <span className="text-white">SKILLS</span>
          </h2>
        </div>

        {/* 🌠 Orbit System */}
        <div className="relative h-[500px] w-[100vw] max-w-none overflow-hidden mx-auto flex items-center justify-center z-10">
          {/* 🌟 Central Star */}
          <img
            src="assets/star.png"
            alt="Central Star"
            className="absolute w-24 sm:w-32 md:w-40 h-auto z-20 object-contain"
          />

          {/* ⚪ SVG Orbits - Made concentric */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <svg
              viewBox="0 0 1000 300"
              className="w-full h-full max-w-[1000px] opacity-30"
              preserveAspectRatio="xMidYMid meet"
            >
              {[0, 1, 2].map((i) => {
                const spacing = 60 * i; // Increased spacing to prevent intersection
                return (
                  <ellipse
                    key={i}
                    cx="500"
                    cy="150"
                    rx={orbitRadii.radiusX - spacing}
                    ry={orbitRadii.radiusY - spacing * 0.5} // Reduced Y spacing to keep ellipse shape
                    fill="none"
                    stroke="white"
                    strokeDasharray="4 4"
                    strokeOpacity="0.5"
                  />
                );
              })}
            </svg>
          </div>

          {/* 🌍 Orbiting Planets */}
          {Object.entries(skillsData).map(([category, data]) => {
            const angle = ((data.angle + rotation) * Math.PI) / 180;
            const x = Math.cos(angle) * orbitRadii.radiusX;
            const y = Math.sin(angle) * orbitRadii.radiusY;

            return (
              <div
                key={category}
                className="absolute flex flex-col items-center transition-transform duration-300"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <img
                  src={`assets/${data.icon}`}
                  alt={category}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain hover:scale-110 transition-transform duration-300"
                  title={category}
                />
                <span className="mt-2 text-xs sm:text-sm text-gray-300 bg-black/60 px-2 py-0.5 rounded-full border border-gray-700">
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Skills;