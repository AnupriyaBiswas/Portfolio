import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  FRONTEND: {
    icon: "skill1.png",
    angle: 0,
  },
  BACKEND: {
    icon: "skill2.png",
    angle: 60,
  },
  "AI / ML": {
    icon: "skill3.png",
    angle: 120,
  },
  DATABASE: {
    icon: "skill4.png",
    angle: 180,
  },
  TOOLS: {
    icon: "skill5.png",
    angle: 240,
  },
  SYSTEMS: {
    icon: "skill6.png",
    angle: 300,
  },
};

const Skills = () => {
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.06);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Responsive orbit radii (updated dynamically)
  const getOrbitRadii = () => {
    const width = window.innerWidth;

    if (width < 640) {
      return { radiusX: 220, radiusY: 180 }; // mobile
    } else if (width < 768) {
      return { radiusX: 320, radiusY: 160 }; // tablet
    } else if (width < 1024) {
      return { radiusX: 400, radiusY: 140 }; // small desktop
    } else {
      return { radiusX: 480, radiusY: 120 }; // large screen
    }
  };

  const { radiusX, radiusY } = getOrbitRadii();

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen bg-black text-white overflow-x-hidden w-screen"
    >
      {/* Heading */}
      <div className="pt-36 pb-12 text-center">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold">
          <span className="text-orange-500">TECH</span>{" "}
          <span className="text-white">SKILLS</span>
        </h2>
      </div>

      {/* Solar System */}
      <div className="relative h-[500px] w-[100vw] max-w-none overflow-hidden mx-auto flex items-center justify-center">
        {/* Background Stars */}
        <div className="absolute inset-0 -z-10">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`,
              }}
            ></div>
          ))}
        </div>

        {/* Central Star */}
        <img
          src="assets/star.png"
          alt="Central Star"
          className="absolute w-24 sm:w-32 md:w-40 h-auto z-20 object-contain"
        />

        {/* Orbit SVG */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 300"
            className="w-full h-full max-w-[1000px] opacity-30"
            preserveAspectRatio="xMidYMid meet"
          >
            <ellipse
              cx="500"
              cy="150"
              rx={radiusX}
              ry={radiusY}
              fill="none"
              stroke="white"
              strokeDasharray="4 4"
              strokeOpacity="0.8"
            />
          </svg>
        </div>

        {/* Planets */}
        {Object.entries(skillsData).map(([category, data]) => {
          const angle = ((data.angle + rotation) * Math.PI) / 180;
          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;

          return (
            <div
              key={category}
              className="absolute flex flex-col items-center transition-transform duration-300"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
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
  );
};

export default Skills;
