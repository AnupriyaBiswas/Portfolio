import React, { useState, useEffect } from "react";

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

  const filteredProjects =
    selectedDomain === "All"
      ? projects
      : projects.filter((proj) => proj.domain.trim().toLowerCase() === selectedDomain.trim().toLowerCase());

  // Reset carousel position when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedDomain]);

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev === 0 ? filteredProjects.length - 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToCard = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Calculate positions for upward semicircle layout
  const getCardPosition = (index, totalCards) => {
    const radius = 280; // Radius of the semicircle
    const centerIndex = currentIndex;
    const relativeIndex = (index - centerIndex + totalCards) % totalCards;
    
    // Angle for upward semicircle (from 0 to π, creating an upward arch)
    const startAngle = 0; // Start from right (0 degrees)
    const endAngle = Math.PI; // End at left (180 degrees)
    const angleRange = endAngle - startAngle; // Total angle span
    const angle = startAngle + (relativeIndex * angleRange) / (totalCards - 1);
    
    // Calculate x, y coordinates (y will be negative for upward arch)
    const x = Math.cos(angle) * radius;
    const y = -Math.sin(angle) * radius; // Negative y for upward arch
    
    // Scale and opacity based on position
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    
    if (relativeIndex === 0) {
      // Center card (current)
      scale = 1.1;
      opacity = 1;
      zIndex = 20;
    } else if (relativeIndex === 1 || relativeIndex === totalCards - 1) {
      // Adjacent cards
      scale = 0.9;
      opacity = 0.8;
      zIndex = 15;
    } else {
      // Background cards
      scale = 0.7;
      opacity = 0.5;
      zIndex = 5;
    }
    
    return {
      x,
      y,
      scale,
      opacity,
      zIndex,
      rotation: relativeIndex === 0 ? 0 : (relativeIndex - 1) * 5 // Slight rotation for depth
    };
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-black text-white relative overflow-hidden px-4 md:px-20 py-20"
    >
      {/* Fishing Image */}
      <img
        src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=160&h=160&fit=crop&crop=center"
        alt="Fishing Astronaut"
        className="absolute top-15 right-24 w-[85px] sm:w-[110px] md:w-[135px] lg:w-[160px] z-30 rounded-full opacity-80"
        style={{ transform: "translate(50%, -20%)" }}
      />

      {/* Heading */}
      <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-10 text-left">
        <span className="text-orange-500">PROJECT</span>
        <span className="text-white ml-4">SHOWCASE</span>
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-16">
        {/* Mobile Dropdown */}
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="md:hidden bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 w-full"
        >
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>

        {/* Desktop Tabs */}
        <div className="hidden md:flex flex-wrap gap-4 animate-slide-in">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`text-base font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                selectedDomain === domain
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105"
                  : "text-gray-400 hover:text-white border-2 border-gray-700 hover:border-orange-500/50 hover:shadow-md hover:shadow-orange-500/10 bg-gray-900/50"
              }`}
            >
              <span className="flex items-center gap-2">
                {domain === "All" && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 15a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" />
                  </svg>
                )}
                {domain === "WebDev" && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
                {domain === "AI/ML" && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {domain === "Desktop" && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                )}
                {domain}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Semicircle Carousel Container */}
      <div className="relative flex items-end justify-center min-h-[400px] mb-16">
        {/* Navigation Arrows */}
        {filteredProjects.length > 1 && (
          <>
            <button
              onClick={prevCard}
              disabled={isAnimating}
              className="absolute left-4 bottom-0 z-30 w-12 h-12 bg-gray-900/80 hover:bg-gray-800/80 text-white rounded-full border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextCard}
              disabled={isAnimating}
              className="absolute right-4 bottom-0 z-30 w-12 h-12 bg-gray-900/80 hover:bg-gray-800/80 text-white rounded-full border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Semicircle Card Layout */}
        <div className="relative w-full h-full flex items-end justify-center">{/* Changed to items-end */}
          {filteredProjects.map((project, index) => {
            const position = getCardPosition(index, filteredProjects.length);
            const isCenter = (index === currentIndex);
            
            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                  isCenter ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale}) rotate(${position.rotation}deg)`,
                  opacity: position.opacity,
                  zIndex: position.zIndex,
                }}
                onClick={() => !isCenter && goToCard(index)}
              >
                <div
                  className={`w-[300px] bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden p-6 transition-all duration-300 ${
                    isCenter 
                      ? 'shadow-2xl shadow-orange-500/20 border-orange-500/30' 
                      : 'hover:shadow-xl hover:shadow-orange-500/10'
                  }`}
                >
                  <div className="mb-3 text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        project.status === "Live"
                          ? "bg-green-500"
                          : project.status === "Completed"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      } animate-pulse`}
                    ></div>
                    <span>{project.status}</span>
                  </div>
                  <h3 className={`font-bold mb-3 text-white ${isCenter ? 'text-xl' : 'text-lg'}`}>
                    {project.title}
                  </h3>
                  {isCenter && (
                    <>
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-800/70 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm"
                      >
                        Explore Project
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
                    </>
                  )}
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
                  ? "bg-orange-500 shadow-lg shadow-orange-500/50"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}

      {/* Animations */}
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
      `}</style>
    </section>
  );
};

export default Projects;