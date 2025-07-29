import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  FRONTEND: { icon: "skill1.png", angle: 0 },
  BACKEND: { icon: "skill2.png", angle: 60 },
  "AI / ML": { icon: "skill3.png", angle: 120 },
  DATABASE: { icon: "skill4.png", angle: 180 },
  TOOLS: { icon: "skill5.png", angle: 240 },
  SYSTEMS: { icon: "skill6.png", angle: 300 },
};

const skillsDetails = {
  FRONTEND: {
    categoryName: "FRONTEND SKILLS",
    details: ["HTML/CSS", "React", "Bootstrap", "Node.js (Contextual)"],
  },
  BACKEND: {
    categoryName: "BACKEND SKILLS",
    details: ["Node.js", "REST APIs"],
  },
  "AI / ML": {
    categoryName: "AI / ML SKILLS",
    details: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "OpenCV",
      "Matplotlib",
    ],
  },
  DATABASE: {
    categoryName: "DATABASE SKILLS",
    details: ["MySQL", "MongoDB", "SQL"],
  },
  TOOLS: {
    categoryName: "DEVELOPER TOOLS & LIBRARIES",
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
  SYSTEMS: {
    categoryName: "OPERATING SYSTEMS & CONCEPTS",
    details: [
      "Linux (Ubuntu)",
      "Windows",
      "Android",
      "Object-Oriented Programming (OOP)",
      "Data Structures and Algorithms",
    ],
  },
};

const Skills = () => {
  const [stars, setStars] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [orbitRadii, setOrbitRadii] = useState({ radiusX: 480, radiusY: 120 });
  const sectionRef = useRef(null);

  // New state for skill card visibility and content
  const [showSkillCard, setShowSkillCard] = useState(false);
  const [currentSkillCategory, setCurrentSkillCategory] = useState(null);

  useEffect(() => {
    // Add CSS animations to document head
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
      
      .star-fall {
        animation: fall linear infinite;
      }
    `;
    document.head.appendChild(styleElement);

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

    // Cleanup function to remove styles when component unmounts
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
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

      setRotation((prev) => prev + (0.06 * delta) / 16);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle click on a skill planet
  const handlePlanetClick = (category) => {
    setCurrentSkillCategory(category);
    setShowSkillCard(true);
  };

  // Close the skill card
  const handleCloseSkillCard = () => {
    setShowSkillCard(false);
    setCurrentSkillCategory(null);
  };

  // Get the details for the currently selected skill category
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
        <div className="absolute inset-0 overflow-hidden z-20">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white star-fall"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
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
                className="absolute flex flex-col items-center transition-transform duration-300 cursor-pointer"
                style={{ transform: `translate(${x}px, ${y}px)` }}
                onClick={() => handlePlanetClick(category)}
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

      {/* Skill Details Card */}
      {showSkillCard && detailsToShow && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleCloseSkillCard}
        >
          {/* Card backdrop - semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>

          {/* Actual Skill Card */}
          <div
            className="relative bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-auto border border-gray-700 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-bold mb-6 text-center text-orange-400">
              {detailsToShow.categoryName}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-lg">
              {detailsToShow.details.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-orange-300">●</span>
                  {skill}
                </li>
              ))}
            </ul>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
              onClick={handleCloseSkillCard}
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