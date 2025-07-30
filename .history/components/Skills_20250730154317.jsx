import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image

// (skillsData and skillsDetails remain unchanged)
const skillsData = {
  LANGUAGES: { icon: "skill1.png", angle: 0 },
  "DEVELOPER TOOLS & IDEs": { icon: "skill2.png", angle: 60 },
  "LIBRARIES & FRAMEWORKS": { icon: "skill3.png", angle: 120 },
  "DATABASE & BACKEND": { icon: "skill4.png", angle: 180 },
  "CONCEPTS & PARADIGMS": { icon: "skill5.png", angle: 240 },
  "OPERATING SYSTEMS": { icon: "skill6.png", angle: 300 },
};

const Skills = () => {
  // ... your existing state + useEffects remain unchanged

  return (
    <>
      <section
        id="skills"
        className="min-h-screen bg-black text-white relative overflow-hidden w-screen"
      >
        {/* Central Star Image */}
        <Image
          src="/assets/star.png"  // ✅ from public/assets
          alt="Central Star"
          width={160}   // adjust as needed
          height={160}
          className="absolute w-24 sm:w-32 md:w-40 h-auto z-30 object-contain"
        />

        {/* Orbiting Planets */}
        {Object.entries(skillsData).map(([category, data]) => {
          const angle = ((data.angle + rotation) * Math.PI) / 180;
          const x = Math.cos(angle) * orbitRadii.radiusX;
          const y = Math.sin(angle) * orbitRadii.radiusY;

          return (
            <div
              key={category}
              className="absolute flex flex-col items-center transition-transform duration-300 cursor-pointer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => handlePlanetClick(category)}
              suppressHydrationWarning={true}
            >
              <Image
                src={`/assets/${data.icon}`} // ✅ from public/assets
                alt={category}
                width={96}  // about 24 tailwind units
                height={96}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain hover:scale-110 transition-transform duration-300"
              />
              <span className="mt-2 text-xs sm:text-sm text-gray-300 bg-black/60 px-2 py-0.5 rounded-full border border-gray-700 whitespace-nowrap">
                {isSmallScreen && categoryAbbreviations[category]
                  ? categoryAbbreviations[category]
                  : category}
              </span>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Skills;
