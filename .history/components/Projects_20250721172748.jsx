<div
                  className={`w-[280px] sm:w-[300px] lg:w-[320import React, { useState, useEffect } from "react";

// 💾 Dummy Project Data with Domains
const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio built with Next.js and Tailwind CSS, showcasing my work and skills.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://github.com/nevo/portfolio",
    status: "Live",
    gradient: "from-blue-500 to-cyan-400",
    domain: "WebDev",
  },
  {
    title: "Weather App",
    description:
      "A minimal weather app using the OpenWeatherMap API to display real-time weather updates.",
    tech: ["React", "API", "CSS Modules"],
    link: "https://github.com/nevo/weather-app",
    status: "Completed",
    gradient: "from-green-500 to-emerald-400",
    domain: "WebDev",
  },
  {
    title: "Blog Platform",
    description:
      "A Markdown-based blogging platform with syntax highlighting, search, and responsive design.",
    tech: ["Next.js", "MDX", "Tailwind"],
    link: "https://github.com/nevo/blog-platform",
    status: "In Progress",
    gradient: "from-purple-500 to-pink-400",
    domain: "WebDev",
  },
  {
    title: "Parkinson Gait Classifier",
    description:
      "Classifies Parkinson's gait from normal gait using multimodal EMG + IMU fusion using CNN + RNN.",
    tech: ["PyTorch", "CNN", "RNN", "Fusion"],
    link: "#",
    status: "In Progress",
    gradient: "from-indigo-500 to-purple-500",
    domain: "AI/ML",
  },
  {
    title: "AI-Powered PDF Reader",
    description:
      "Reads scanned medical PDFs and extracts useful clinical summaries using OCR + NLP pipeline.",
    tech: ["Tesseract", "Transformers", "HuggingFace"],
    link: "#",
    status: "Prototype",
    gradient: "from-yellow-500 to-orange-400",
    domain: "AI/ML",
  },
  {
    title: "Inventory Manager",
    description:
      "Cross-platform desktop app for tracking product stocks and suppliers using Electron.",
    tech: ["Electron", "SQLite", "JavaScript"],
    link: "#",
    status: "Completed",
    gradient: "from-pink-500 to-red-400",
    domain: "Desktop",
  },
];

const domains = ["All", "WebDev", "AI/ML", "Desktop"];

const Projects = () => {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredProjects =
    selectedDomain === "All"
      ? projects
      : projects.filter((proj) => proj.domain.trim().toLowerCase() === selectedDomain.trim().toLowerCase());

  // Auto-rotation effect
  useEffect(() => {
    if (isHovered || filteredProjects.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 3000); // Auto-rotate every 3 seconds
    
    return () => clearInterval(interval);
  }, [filteredProjects.length, isHovered]);

  // Reset carousel position when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedDomain]);

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev === 0 ? filteredProjects.length - 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const goToCard = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  // Calculate 3D curved positions exactly like Dribbble design
  const getCardPosition = (index, totalCards) => {
    const centerIndex = hoveredCard !== null ? hoveredCard : currentIndex;
    const relativeIndex = (index - centerIndex + totalCards) % totalCards;
    
    // More dramatic 3D effect like the reference
    const maxVisibleCards = Math.min(7, totalCards);
    const centerOffset = Math.floor(maxVisibleCards / 2);
    
    let x = 0;
    let y = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    let rotateY = 0;
    let rotateX = 0;
    let translateZ = 0;
    
    if (relativeIndex === 0) {
      // Center card - prominent and forward
      x = 0;
      y = 0;
      scale = hoveredCard === index ? 1.25 : 1.15; // Extra magnification on hover
      opacity = 1;
      zIndex = 100;
      rotateY = 0;
      rotateX = 0;
      translateZ = hoveredCard === index ? 150 : 100;
    } else if (relativeIndex <= centerOffset) {
      // Right side cards - stacked with increasing angle and depth
      const position = relativeIndex;
      x = position * 100 + (position * position * 15); // Adjusted for wider screen
      y = position * 12; // Slight vertical offset
      scale = Math.max(0.6, 1 - position * 0.15);
      opacity = Math.max(0.3, 1 - position * 0.2);
      zIndex = 100 - position * 10;
      rotateY = -position * 15 - (position * position * 5); // Increasing angle
      rotateX = position * 3; // Slight tilt
      translateZ = -position * 120; // Adjusted depth
    } else if (relativeIndex >= totalCards - centerOffset) {
      // Left side cards - mirror of right side
      const position = totalCards - relativeIndex;
      x = -position * 100 - (position * position * 15); // Adjusted for wider screen
      y = position * 12; // Slight vertical offset
      scale = Math.max(0.6, 1 - position * 0.15);
      opacity = Math.max(0.3, 1 - position * 0.2);
      zIndex = 100 - position * 10;
      rotateY = position * 15 + (position * position * 5); // Increasing angle
      rotateX = position * 3; // Slight tilt
      translateZ = -position * 120; // Adjusted depth
    } else {
      // Hidden cards - completely behind
      scale = 0.4;
      opacity = 0;
      zIndex = 1;
      translateZ = -600;
      rotateY = relativeIndex > centerOffset ? -60 : 60;
    }
    
    return {
      x,
      y,
      scale,
      opacity,
      zIndex,
      rotateY,
      rotateX,
      translateZ,
    };
  };

  return (
    <section
      id="projects"
      className="h-screen bg-black text-white relative overflow-hidden flex flex-col px-4 sm:px-8 lg:px-16 xl:px-24 py-8 lg:py-12"
    >
      {/* Fishing Image */}
      <img
        src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=160&h=160&fit=crop&crop=center"
        alt="Fishing Astronaut"
        className="absolute top-4 right-4 sm:top-8 sm:right-8 lg:top-12 lg:right-16 w-16 sm:w-20 lg:w-24 xl:w-32 z-30 rounded-full opacity-80"
      />

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 text-left">
        <span className="text-orange-500">PROJECT</span>
        <span className="text-white ml-2 sm:ml-4">SHOWCASE</span>
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Mobile Dropdown */}
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="lg:hidden bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 w-full text-sm"
        >
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>

        {/* Desktop Tabs */}
        <div className="hidden lg:flex flex-wrap gap-3 animate-slide-in">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`text-sm xl:text-base font-bold px-4 xl:px-6 py-2 xl:py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                selectedDomain === domain
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105"
                  : "text-gray-400 hover:text-white border-2 border-gray-700 hover:border-orange-500/50 hover:shadow-md hover:shadow-orange-500/10 bg-gray-900/50"
              }`}
            >
              <span className="flex items-center gap-2">
                {domain === "All" && (
                  <svg className="w-3 h-3 xl:w-4 xl:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 15a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" />
                  </svg>
                )}
                {domain === "WebDev" && (
                  <svg className="w-3 h-3 xl:w-4 xl:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
                {domain === "AI/ML" && (
                  <svg className="w-3 h-3 xl:w-4 xl:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {domain === "Desktop" && (
                  <svg className="w-3 h-3 xl:w-4 xl:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                )}
                {domain}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Carousel Container */}
      <div 
        className="relative flex items-center justify-center flex-1 min-h-0" 
        style={{perspective: '1200px', perspectiveOrigin: 'center center'}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredCard(null);
        }}
      >
        {/* Navigation Arrows */}
        {filteredProjects.length > 1 && (
          <>
            <button
              onClick={prevCard}
              disabled={isAnimating}
              className="absolute left-2 lg:left-8 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 bg-gray-900/80 hover:bg-gray-800/80 text-white rounded-full border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextCard}
              disabled={isAnimating}
              className="absolute right-2 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 bg-gray-900/80 hover:bg-gray-800/80 text-white rounded-full border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* 3D Card Layout */}
        <div className="relative w-full h-full flex items-center justify-center preserve-3d">
          {filteredProjects.map((project, index) => {
            const position = getCardPosition(index, filteredProjects.length);
            const isCenter = (index === currentIndex);
            
            return (
              <div
                key={index}
                className={`absolute transition-all duration-1200 ease-out cursor-pointer transform-gpu preserve-3d ${
                  isCenter ? 'pointer-events-auto' : 'pointer-events-auto'
                }`}
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, ${position.translateZ}px) scale(${position.scale}) rotateY(${position.rotateY}deg) rotateX(${position.rotateX}deg)`,
                  opacity: position.opacity,
                  zIndex: position.zIndex,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => !isCenter && goToCard(index)}
                onMouseEnter={() => {
                  if (!isCenter) {
                    setHoveredCard(index);
                  }
                }}
                onMouseLeave={() => {
                  if (hoveredCard === index) {
                    setHoveredCard(null);
                  }
                }}
              >
                <div
                  className={`w-[300px] min-h-[420px] bg-gradient-to-br backdrop-blur-md rounded-2xl border overflow-hidden transition-all duration-700 transform-gpu shadow-2xl ${
                    isCenter 
                      ? 'from-gray-800/95 to-gray-900/95 border-orange-400/60 shadow-orange-500/25' 
                      : 'from-gray-900/90 to-black/90 border-gray-600/40 shadow-black/50'
                  }`}
                  style={{
                    boxShadow: isCenter 
                      ? '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 30px rgba(249,115,22,0.3)' 
                      : '0 20px 40px -12px rgba(0,0,0,0.6)'
                  }}
                >
                  {/* Card Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                  
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            project.status === "Live"
                              ? "bg-green-500"
                              : project.status === "Completed"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          } animate-pulse shadow-lg`}
                        ></div>
                        <span className="text-sm font-medium text-gray-300">{project.status}</span>
                      </div>
                      <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                        {project.domain}
                      </span>
                    </div>
                    
                    <h3 className={`font-bold mb-4 text-white leading-tight ${isCenter ? 'text-xl' : 'text-lg'}`}>
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed text-sm line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, isCenter ? project.tech.length : 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-800/70 text-gray-300 rounded-full text-xs font-medium border border-gray-700/50 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {!isCenter && project.tech.length > 3 && (
                        <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs font-medium">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-auto">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 ${
                          isCenter ? 'hover:scale-105' : 'hover:scale-100'
                        }`}
                      >
                        {isCenter ? 'Explore Project' : 'View Details'}
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Indicators */}
      {filteredProjects.length > 1 && (
        <div className="flex justify-center gap-3">
          {filteredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                currentIndex === index
                  ? "bg-orange-500 shadow-lg shadow-orange-500/50 scale-125"
                  : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
              }`}
            />
          ))}
        </div>
      )}

      {/* Enhanced Animations and 3D Styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out both;
        }

        /* Enhanced 3D Effects */
        .preserve-3d {
          transform-style: preserve-3d;
        }

        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }

        /* Dramatic shadows for 3D depth */
        .shadow-2xl {
          filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.4));
        }

        /* Add realistic depth perception */
        [style*="translateZ"] {
          will-change: transform, opacity;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Add subtle glow effects */
        .shadow-orange-500\/30 {
          box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.3);
        }

        .shadow-orange-500\/40 {
          box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.4);
        }

        .shadow-orange-500\/20 {
          box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.2);
        }

        .shadow-orange-500\/25 {
          box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.25);
        }
      `}</style>
    </section>
  );
};

export default Projects;