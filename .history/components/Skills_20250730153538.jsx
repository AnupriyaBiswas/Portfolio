import React, { useEffect, useRef, useState } from "react";

// (skillsData and skillsDetails remain unchanged)
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

// New Abbreviation Mapping
const categoryAbbreviations = {
  "LANGUAGES": "LANGS",
  "DEVELOPER TOOLS & IDEs": "DEV TOOLS",
  "LIBRARIES & FRAMEWORKS": "LIBS & FRWKS",
  "DATABASE & BACKEND": "DB & BACKEND",
  "CONCEPTS & PARADIGMS": "CONCEPTS",
  "OPERATING SYSTEMS": "OS",
};


const Skills = () => {
  const [stars, setStars] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [orbitRadii, setOrbitRadii] = useState({ radiusX: 500, radiusY: 180 }); // Default desktop sizes
  const [isSmallScreen, setIsSmallScreen] = useState(false); // New state to check for small screens
  const sectionRef = useRef(null);

  const [showSkillCard, setShowSkillCard] = useState(false);
  const [currentSkillCategory, setCurrentSkillCategory] = useState(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes fall {
        0% {
          transform: translateY(-100vh);
        }
        100% {
          transform: translateY(100vh);
        }
      }
      
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .animate-fade-in {
        animation: fade-in 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(styleElement);

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

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Define your breakpoints and corresponding orbit dimensions
      if (width < 640) { // Smallest mobile screens
        setOrbitRadii({ radiusX: 100, radiusY: 200 }); // Much taller and narrower
        setIsSmallScreen(true); // Set true for small screens
      } else if (width < 768) { // Larger phones, small tablets
        setOrbitRadii({ radiusX: 200, radiusY: 300 }); // Taller, but a bit wider
        setIsSmallScreen(true); // Still consider this small enough for abbreviations
      } else if (width < 1024) { // Tablets
        setOrbitRadii({ radiusX: 300, radiusY: 160 }); // Closer to original, still slightly taller
        setIsSmallScreen(false); // Full labels for tablets and up
      } else { // Desktop and larger
        setOrbitRadii({ radiusX: 500, radiusY: 180 }); // Original desktop dimensions
        setIsSmallScreen(false); // Full labels for desktop
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

  return (
    <>
      <section
        ref={sectionRef}
        id="skills"
        className="min-h-screen bg-black text-white relative overflow-hidden w-screen"
      >
        {/* Animated Stars Background */}
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
                animationName: 'fall',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDuration: `${star.animationDuration}s`,
                animationDelay: `${star.animationDelay}s`,
              }}
            />
          ))}
        </div>

        {/* 🪐 Heading */}
        <div className="pt-36 pb-12 text-center z-10 relative">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-5">
            <span className="text-orange-500">TECH</span>{" "}
            <span className="text-white">SKILLS</span>
          </h2>
        </div>

        {/* 🌠 Orbit System */}
        <div className="relative h-[500px] w-[100vw] max-w-none overflow-hidden mx-auto flex items-center justify-center z-20">
          {/* 🌟 Central Star */}
          <img
            src="assets/star.png"
            alt="Central Star"
            className="absolute w-24 sm:w-32 md:w-40 h-auto z-30 object-contain"
          />

          {/* ⚪ SVG Orbits - Made concentric */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <svg
              viewBox="0 0 1000 300" // Keep this viewBox constant for the SVG
              className="w-full h-full max-w-[1000px] opacity-30"
              preserveAspectRatio="xMidYMid meet"
            >
              {[0, 1, 2].map((i) => {
                // Adjust spacing based on original desktop ratios for concentric effect
                const desktopSpacingX = 60 * i;
                const desktopSpacingY = desktopSpacingX * (180 / 500); // Maintain desktop aspect ratio for spacing

                // Dynamically adjust spacing for current orbitRadii aspect ratio
                const currentRatio = orbitRadii.radiusY / orbitRadii.radiusX;
                const adjustedSpacingX = desktopSpacingX;
                const adjustedSpacingY = desktopSpacingX * currentRatio; // Use current ratio for spacing

                return (
                  <ellipse
                    key={i}
                    cx="500" // Center X
                    cy="150" // Center Y
                    rx={Math.max(0, orbitRadii.radiusX - adjustedSpacingX)} // Ensure radius is not negative
                    ry={Math.max(0, orbitRadii.radiusY - adjustedSpacingY)} // Ensure radius is not negative
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
            // Calculate X and Y based on the current (potentially modified for mobile) radii
            const x = Math.cos(angle) * orbitRadii.radiusX;
            const y = Math.sin(angle) * orbitRadii.radiusY;

            // Determine the label to display
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
              >
                <img
                  src={`assets/${data.icon}`}
                  alt={category}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain hover:scale-110 transition-transform duration-300"
                  title={category}
                />
                <span
                  className="mt-2 text-xs sm:text-sm text-gray-300 bg-black/60 px-2 py-0.5 rounded-full border border-gray-700"
                >
                  {displayLabel}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skill Details Card - Z-index adjustments */}
      {showSkillCard && detailsToShow && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleCloseSkillCard}
        >
          {/* Card backdrop - semi-transparent overlay WITH BLUR */}
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

          {/* Actual Skill Card */}
          <div
            className="relative text-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-auto
                       border-2 border-orange-600 shadow-orange-500/50 animate-fade-in
                       transform transition-all duration-300 ease-out scale-100
                       bg-cover bg-center bg-no-repeat z-50"
            onClick={(e) => e.stopPropagation()}
            style={{
              // Keep background styles as they were for the transparent card
            }}
          >
            {/* Content Wrapper for Z-index */}
            <div className="relative z-10">
              {/* Category Title */}
              <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-orange-400 pr-10 sm:pr-12">
                {detailsToShow.categoryName}
              </h3>

              {/* Skill List */}
              <ul className="list-none space-y-3 text-lg sm:text-xl px-4">
                {detailsToShow.details.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-3 text-orange-300 text-2xl">⚡</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Close Button */}
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