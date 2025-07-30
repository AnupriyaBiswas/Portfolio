import React, { useEffect, useRef, useState } from "react";

// Skills Data
const skillsData = {
  LANGUAGES: { icon: "skill1.png", angle: 0 },
  "DEVELOPER TOOLS & IDEs": { icon: "skill2.png", angle: 60 },
  "LIBRARIES & FRAMEWORKS": { icon: "skill3.png", angle: 120 },
  "DATABASE & BACKEND": { icon: "skill4.png", angle: 180 },
  "CONCEPTS & PARADIGMS": { icon: "skill5.png", angle: 240 },
  "OPERATING SYSTEMS": { icon: "skill6.png", angle: 300 },
};

// Skill details for modal
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
    details: [
      "Object-Oriented Programming (OOP)",
      "Data Structures and Algorithms",
    ],
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
  const [stars, setStars] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [orbitRadii, setOrbitRadii] = useState({ radiusX: 350, radiusY: 120 });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showSkillCard, setShowSkillCard] = useState(false);
  const [currentSkillCategory, setCurrentSkillCategory] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ensures client-only rendering for animation
    // generate stars
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
  }, []);

  // Handle responsive orbits
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
        setOrbitRadii({ radiusX: 350, radiusY: 120 });
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth continuous rotation
  useEffect(() => {
    if (!mounted) return;
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      setRotation((prev) => (prev + (0.04 * delta) / 16) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted]);

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
        className="min-h-screen bg-black text-white relative overflow-hidden w-screen"
      >
        {/* Animated Stars */}
        <div className="absolute inset-0 overflow-hidden z-0">
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
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${star.animationDuration}s`,
                animationDelay: `${star.animationDelay}s`,
              }}
            />
          ))}
        </div>

        {/* Heading */}
        <div className="pt-36 pb-12 text-center z-10 relative">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-5">
            <span className="text-orange-500">TECH</span>{" "}
            <span className="text-white">SKILLS</span>
          </h2>
        </div>

        {/* Orbit System */}
        <div className="relative h-[600px] w-full flex items-center justify-center z-20">
          {/* Central Star */}
          <img
            src="assets/star.png"
            alt="Central Star"
            className="absolute w-24 sm:w-32 md:w-40 h-auto z-30 object-contain"
          />

          {/* SVG Orbits */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <svg
              viewBox="0 0 1000 1000"
              className="w-full h-full max-w-[1000px] opacity-60"
              preserveAspectRatio="xMidYMid meet"
            >
              {[0, 1, 2].map((i) => {
                const spacingFactor = i * 0.2;
                const effectiveRadiusX = Math.max(
                  0,
                  orbitRadii.radiusX * (1 - spacingFactor)
                );
                const effectiveRadiusY = Math.max(
                  0,
                  orbitRadii.radiusY * (1 - spacingFactor)
                );
                return (
                  <ellipse
                    key={i}
                    cx={svgCenterX}
                    cy={svgCenterY}
                    rx={effectiveRadiusX}
                    ry={effectiveRadiusY}
                    fill="none"
                    stroke="white"
                    strokeDasharray="4 4"
                    strokeOpacity="0.5"
                    strokeWidth={isSmallScreen ? 1.5 : 1}
                  />
                );
              })}
            </svg>
          </div>

          {/* Orbiting Planets */}
          {mounted &&
            Object.entries(skillsData).map(([category, data]) => {
              const safeRotation = rotation ?? 0;
              const angle = ((data.angle + safeRotation) * Math.PI) / 180;
              const x = Math.cos(angle) * orbitRadii.radiusX;
              const y = Math.sin(angle) * orbitRadii.radiusY;
              const displayLabel =
                isSmallScreen && categoryAbbreviations[category]
                  ? categoryAbbreviations[category]
                  : category;

              return (
                <div
                  key={category}
                  className="absolute flex flex-col items-center cursor-pointer transition-transform duration-300"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  onClick={() => handlePlanetClick(category)}
                >
                  <img
                    src={`assets/${data.icon}`}
                    alt={category}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain hover:scale-110 transition-transform duration-300"
                  />
                  <span className="mt-2 text-xs sm:text-sm text-gray-300 bg-black/60 px-2 py-0.5 rounded-full border border-gray-700 whitespace-nowrap">
                    {displayLabel}
                  </span>
                </div>
              );
            })}
        </div>
      </section>

      {/* Modal */}
      {showSkillCard && detailsToShow && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleCloseSkillCard}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
          <div
            className="relative text-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-auto
                       border-2 border-orange-600 shadow-orange-500/50 animate-fade-in bg-cover bg-center z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-orange-400">
              {detailsToShow.categoryName}
            </h3>
            <ul className="list-none space-y-3 text-lg sm:text-xl px-4">
              {detailsToShow.details.map((skill, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="mr-3 text-orange-300 text-2xl">⚡</span>
                  {skill}
                </li>
              ))}
            </ul>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-4xl transition-colors duration-200"
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
