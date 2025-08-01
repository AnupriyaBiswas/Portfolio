import React, { useEffect, useRef, useState } from "react";

// (skillsData and skillsDetails remain unchanged as they are correct)
const skillsData = {
  LANGUAGES: { icon: "skill1.png", angle: 0 },
  "DEVELOPER TOOLS & IDEs": { icon: "skill2.png", angle: 60 },
  "LIBRARIES & FRAMEWORKS": { icon: "skill3.png", angle: 120 },
  "DATABASE & BACKEND": { icon: "skill4.png", angle: 180 },
  "CONCEPTS & PARADIGMS": { icon: "skill5.png", angle: 240 },
  "OPERATING SYSTEMS": { icon: "skill6.png", angle: 300 },
};

const skillsDetails = {
  LANGUAGES: {
    categoryName: "PROGRAMMING LANGUAGES",
    details: ["Python", "Java", "C/C++", "HTML/CSS", "SQL"],
  },
  "DEVELOPER TOOLS & IDEs": {
    categoryName: "DEVELOPER TOOLS & IDEs",
    details: [
      "Git",
      "GitHub",
      "VS Code",
      "Sublime Text",
      "Android Studio",
      "Jupyter Notebook",
      "WordPress",
    ],
  },
  "LIBRARIES & FRAMEWORKS": {
    categoryName: "LIBRARIES & FRAMEWORKS",
    details: [
      "TensorFlow",
      "PyTorch",
      "Keras",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "OpenCV",
      "Matplotlib",
      "React",
      "Bootstrap",
      "Node.js",
    ],
  },
  "DATABASE & BACKEND": {
    categoryName: "DATABASE & BACKEND TECHNOLOGIES",
    details: ["MySQL", "MongoDB", "REST APIs"],
  },
  "CONCEPTS & PARADIGMS": {
    categoryName: "CONCEPTS & PARADIGMS",
    details: ["Object-Oriented Programming (OOP)", "Data Structures and Algorithms"],
  },
  "OPERATING SYSTEMS": {
    categoryName: "OPERATING SYSTEMS",
    details: ["Linux (Ubuntu)", "Windows", "Android"],
  },
};

// Abbreviation Mapping for planet labels on small screens
const categoryAbbreviations = {
  LANGUAGES: "LANGS",
  "DEVELOPER TOOLS & IDEs": "DEV TOOLS",
  "LIBRARIES & FRAMEWORKS": "LIBS & FRWKS",
  "DATABASE & BACKEND": "DB & BACKEND",
  "CONCEPTS & PARADIGMS": "CONCEPTS",
  "OPERATING SYSTEMS": "OS",
};

const Skills = () => {
  const [rotation, setRotation] = useState(0);
  const [orbitRadii, setOrbitRadii] = useState({ radiusX: 350, radiusY: 120 });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [showSkillCard, setShowSkillCard] = useState(false);
  const [currentSkillCategory, setCurrentSkillCategory] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setOrbitRadii({ radiusX: 100, radiusY: 250 });
        setIsSmallScreen(true);
      } else if (width < 768) {
        setOrbitRadii({ radiusX: 180, radiusY: 350 });
        setIsSmallScreen(true);
      } else if (width < 1024) {
        setOrbitRadii({ radiusX: 280, radiusY: 150 });
        setIsSmallScreen(false);
      } else {
        setOrbitRadii({ radiusX: 600, radiusY: 200 }); // Largest possible orbit
        setIsSmallScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      setRotation((prev) => prev + (0.06 * delta) / 16);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handlePlanetClick = (category) => {
    setCurrentSkillCategory(category);
    setShowSkillCard(true);
  };

  const handleCloseSkillCard = () => {
    setShowSkillCard(false);
    setCurrentSkillCategory(null);
  };

  const detailsToShow = currentSkillCategory
    ? skillsDetails[currentSkillCategory]
    : null;

  const svgCenterX = 500;
  const svgCenterY = 500;

  return (
    <>
      <section
        id="skills"
        className="min-h-screen transparent text-white relative overflow-hidden w-screen"
      >
        {/* Section Heading */}
        <div className="pt-36 pb-0 text-center z-10 relative">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-0">
            <span className="text-orange-500">TECH</span>{" "}
            <span className="text-white">SKILLS</span>
          </h2>
        </div>

        {/* Orbit System Container */}
        <div className="relative h-[600px] w-full max-w-none mx-auto flex items-center justify-center z-20">
          {/* Central Star Image */}
          <img
            src="assets/star.png"
            alt="Central Star"
            className="absolute w-24 sm:w-32 md:w-40 h-auto z-30 object-contain"
          />

          {/* SVG for a single orbit that matches planet path */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <svg
              viewBox="0 0 1000 1000"
              className="w-full h-full max-w-[1000px] opacity-60"
              preserveAspectRatio="xMidYMid meet"
            >
              <ellipse
                cx={svgCenterX}
                cy={svgCenterY}
                rx={orbitRadii.radiusX}
                ry={orbitRadii.radiusY}
                fill="none"
                stroke="white"
                strokeDasharray="4 4"
                strokeOpacity="0.5"
                strokeWidth={isSmallScreen ? 1.5 : 1}
              />
            </svg>
          </div>

          {/* Orbiting Planets */}
          {Object.entries(skillsData).map(([category, data]) => {
            const angle = ((data.angle + rotation) * Math.PI) / 180;
            const x = Math.cos(angle) * orbitRadii.radiusX;
            const y = Math.sin(angle) * orbitRadii.radiusY;
            const displayLabel = isSmallScreen && categoryAbbreviations[category]
              ? categoryAbbreviations[category]
              : category;

            return (
              <div
                key={category}
                className="absolute flex flex-col items-center transition-transform duration-300 cursor-pointer"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                onClick={() => handlePlanetClick(category)}
                suppressHydrationWarning={true}
              >
                <img
                  src={`assets/${data.icon}`}
                  alt={category}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain hover:scale-110 transition-transform duration-300"
                  title={category}
                />
                <span className="mt-2 text-xs sm:text-sm text-gray-300 bg-black/60 px-2 py-0.5 rounded-full border border-gray-700 whitespace-nowrap">
                  {displayLabel}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skill Details Modal */}
      {showSkillCard && detailsToShow && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleCloseSkillCard}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

          <div
            className="relative text-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-auto
                       border-2 border-orange-600 shadow-orange-500/50 transform transition-all
                       duration-300 ease-out scale-100 bg-cover bg-center bg-no-repeat z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-orange-400 pr-10 sm:pr-12">
                {detailsToShow.categoryName}
              </h3>

              <ul className="list-none space-y-3 text-lg sm:text-xl px-4">
                {detailsToShow.details.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-3 text-orange-300 text-2xl">⚡</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-white text-4xl sm:text-5xl transition-colors duration-200 z-50"
              onClick={handleCloseSkillCard}
              aria-label="Close skill details"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Skills;