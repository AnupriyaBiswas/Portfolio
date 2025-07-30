import React, { useEffect, useState } from "react";

const Skills = () => {
  const [rotation, setRotation] = useState(0);
  const orbitRadii = { radiusX: 350, radiusY: 120 };

  const skillsData = {
    LANGUAGES: { icon: "skill1.png", angle: 0 },
    "DEVELOPER TOOLS & IDEs": { icon: "skill2.png", angle: 60 },
    "LIBRARIES & FRAMEWORKS": { icon: "skill3.png", angle: 120 },
    "DATABASE & BACKEND": { icon: "skill4.png", angle: 180 },
    "CONCEPTS & PARADIGMS": { icon: "skill5.png", angle: 240 },
    "OPERATING SYSTEMS": { icon: "skill6.png", angle: 300 },
  };

  // Smooth continuous rotation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      // Speed factor (0.02 = slower, 0.1 = faster)
      setRotation((prev) => (prev + delta * 0.02) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center bg-black text-white">
      {/* Central Sun */}
      <img
        src="/assets/star.png"
        alt="Central Star"
        className="absolute w-28 h-28 object-contain"
      />

      {/* Orbiting Planets */}
      {Object.entries(skillsData).map(([category, data]) => {
        const angle = ((data.angle + rotation) * Math.PI) / 180;
        const x = Math.cos(angle) * orbitRadii.radiusX;
        const y = Math.sin(angle) * orbitRadii.radiusY;

        return (
          <div
            key={category}
            className="absolute flex flex-col items-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              willChange: "transform", // performance hint
            }}
          >
            <img
              src={`/assets/${data.icon}`}
              alt={category}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain hover:scale-110 transition-transform duration-300"
            />
            <span className="mt-2 text-xs sm:text-sm text-gray-300 bg-black/60 px-2 py-0.5 rounded-full border border-gray-700">
              {category}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Skills;
