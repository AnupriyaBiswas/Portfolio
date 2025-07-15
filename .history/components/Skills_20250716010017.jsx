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
          animationDuration: 15 + Math.random() * 10,
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
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      // Adjust 0.06 speed relative to 16ms baseline (60 FPS)
      setRotation((prev) => prev + (0.06 * delta) / 16);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
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
                animationName: "fall",
                animationDuration: `${star.animationDuration}s`,
                animationTimingFunction: "linear",
                animationDelay: `${star.animationDelay}s`,
                animationIterationCount: "infinite",
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
            100% {
              transform: translateY(100vh);
            }
          }
        `}</style>

        {/* 🪐 Heading */}
        <h2
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-20 text-left transition-all duration-1000 inline-flex gap-4 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          style={{ transitionDelay: isVisible ? "0.2s" : "0s" }}
        >
          <span className="text-orange-500 block">PROJECT</span>
          <span className="text-white block">SHOWCASE</span>
        </h2>

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
                    ry={orbitRadii.radiusY - spacing * 0.5}
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
