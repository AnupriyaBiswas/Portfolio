import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image'; // Import the Image component for optimized image loading

const categories = ["All", "WebDev", "AI/ML", "Desktop"];

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A responsive developer portfolio built using Next.js and Tailwind CSS.",
    image: "/assets/portfolio.jpg", // Using placeholder image for now
    link: "https://yourportfolio.com",
    category: "WebDev",
  },
  {
    title: "AI Chatbot",
    description:
      "An AI-powered chatbot using NLP and Transformer models for real-time responses.",
    image: "/assets/portfolio.jpg", // Using placeholder image for now
    link: "https://aibot.com",
    category: "AI/ML",
  },
  {
    title: "Desktop Notes App",
    description: "A cross-platform desktop notes app built with Electron and React.",
    image: "/assets/portfolio.jpg", // Using placeholder image for now
    link: "https://notesapp.com",
    category: "Desktop",
  },
  {
    title: "Stock Price Predictor",
    description: "Predicts stock prices using LSTM networks trained on historical data.",
    image: "/assets/portfolio.jpg", // Using placeholder image for now
    link: "https://stockpredict.com",
    category: "AI/ML",
  },
  {
    title: "E-commerce Platform",
    description:
      "Full-stack e-commerce solution with payment integration and admin dashboard.",
    image: "/assets/portfolio.jpg", // Using placeholder image for now
    link: "https://ecommerce.com",
    category: "WebDev",
  },
  {
    title: "Computer Vision App",
    description:
      "Real-time object detection and classification using OpenCV and TensorFlow.",
    image: "/assets/portfolio.jpg", // Using placeholder image for now
    link: "https://vision.com",
    category: "AI/ML",
  },
];

const ProjectCard = ({ project, activeIndex, index, totalProjects, onClick }) => {
  const getCircularDistance = () => {
    let distance = index - activeIndex;
    if (distance > totalProjects / 2) {
      distance -= totalProjects;
    } else if (distance < -totalProjects / 2) {
      distance += totalProjects;
    }
    return distance;
  };

  const distance = getCircularDistance();
  const absDistance = Math.abs(distance);

  const getTransform = () => {
    const desktopTranslateX1 = 120;
    const desktopTranslateX2 = 240;
    const desktopTranslateXFurther = 80;

    let translateXValue;
    if (absDistance === 0) return "translateX(0) scale(1) rotateY(0deg)";

    if (absDistance === 1) {
      translateXValue =
        distance > 0
          ? `var(--mobile-cap-prefix, ${desktopTranslateX1}px)`
          : `var(--mobile-cap-prefix, ${-desktopTranslateX1}px)`;
    } else if (absDistance === 2) {
      translateXValue =
        distance > 0
          ? `var(--mobile-cap-prefix, ${desktopTranslateX2}px)`
          : `var(--mobile-cap-prefix, ${-desktopTranslateX2}px)`;
    } else {
      const desktopFurtherVal =
        desktopTranslateX2 + (absDistance - 2) * desktopTranslateXFurther;
      translateXValue =
        distance > 0
          ? `var(--mobile-cap-prefix, ${desktopFurtherVal}px)`
          : `var(--mobile-cap-prefix, ${-desktopFurtherVal}px)`;
    }

    let scale = 1;
    let rotateY = 0;

    if (absDistance === 1) {
      scale = 0.85;
      rotateY = distance > 0 ? -15 : 15;
    } else if (absDistance === 2) {
      scale = 0.7;
      rotateY = distance > 0 ? -25 : 25;
    } else {
      scale = 0.55;
      rotateY = distance > 0 ? -35 : 35;
    }

    return `translateX(${translateXValue}) scale(${scale}) rotateY(${rotateY}deg)`;
  };

  const getZIndex = () => {
    return 100 - absDistance;
  };

  const getOpacity = () => {
    if (absDistance === 0) return 1;
    if (absDistance === 1) return 0.8;
    if (absDistance === 2) return 0.6;
    if (absDistance > 2 && absDistance <= totalProjects / 2) return 0.3;
    return 0;
  };

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
      style={{
        transform: `translateX(-50%) translateY(-50%) ${getTransform()}`,
        zIndex: getZIndex(),
        opacity: getOpacity(),
        transformStyle: "preserve-3d",
        perspective: "1000px",
        pointerEvents: absDistance > totalProjects / 2 ? "none" : "auto",
      }}
      data-distance={distance}
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 w-[280px] md:w-[320px] text-white shadow-2xl border border-gray-700 hover:border-orange-500 transition-all duration-500">
        <div className="relative overflow-hidden rounded-lg mb-4 group">
          <img
            src={project.image} // Using project.image directly
            alt={project.title}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-lg font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 px-4 py-2 rounded-full text-white font-medium text-sm shadow-lg hover:shadow-orange-500/30"
        >
          Visit Project →
        </a>
      </div>
    </div>
  );
};

const ProjectShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State for falling stars animation
  const [stars, setStars] = useState([]);

  // Touch swipe states
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const swipeThreshold = 50;

  useEffect(() => {
    // Generate random stars for the background animation
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // Horizontal position
          size: Math.random() * 3 + 1, // Size of the star
          opacity: Math.random() * 0.8 + 0.2, // Initial opacity
          animationDuration: 25 + Math.random() * 20, // Duration for falling
          animationDelay: Math.random() * 10, // Delay before starting
          twinkleDuration: 6 + Math.random() * 8, // Duration for twinkling
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []); // Runs once on mount for stars

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
    setActiveIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    if (isAutoPlaying && filteredProjects.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, filteredProjects.length]);

  const handlePrevious = () => {
    setActiveIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    // No specific action needed here unless preventing default vertical scroll is desired
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
    const diffX = touchEndX - touchStartX;

    if (diffX > swipeThreshold) {
      handlePrevious();
    } else if (diffX < -swipeThreshold) {
      handleNext();
    }
    setIsAutoPlaying(true);
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Custom scrollbar hiding for categories div */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Keyframes for falling stars animation */
        @keyframes fall {
          0% {
            top: -10%; /* Start slightly above the container */
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 110%; /* End slightly below the container */
            opacity: 0;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>

      <section className="relative pt-20 md:pt-32 min-h-screen overflow-hidden bg-black">
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `fall ${star.animationDuration}s linear ${star.animationDelay}s infinite, twinkle ${star.twinkleDuration}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* Top Right Image */}
        <div className="absolute top-15 right-4 z-50">
          <Image src="/assets/fishing.png" alt="Decorative fishing illustration" width={162.5} height={222.3} />
        </div>

        {/* Decorative Elements - Added z-10 to ensure they are above stars */}
        <div
          className="absolute top-40 right-40 w-2 h-2 bg-orange-500 rounded-full z-10"
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-60 left-20 w-1 h-1 bg-white rounded-full z-10"
          style={{ animation: "pulse 3s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full z-10"
          style={{ animation: "pulse 4s ease-in-out infinite" }}
        ></div>

        {/* Hero-style Heading */}
        <div className="relative z-10 px-4 md:px-16">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight text-center mb-6">
            <span className="text-orange-500">PROJECT </span>
            <span className="text-white">SHOWCASE</span>
          </h1>

          {/* Category Filters (Mobile: Dropdown) */}
          <div className="flex justify-center mt-4 gap-6 flex-wrap md:hidden relative z-10"> {/* Added z-10 */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative px-6 py-2 text-sm font-semibold transition-all duration-300
                            text-orange-500 border-b-2 border-orange-500 bg-transparent
                            flex items-center justify-center gap-2 w-48 mx-auto"
            >
              {selectedCategory === "All" ? "Categories" : selectedCategory}{" "}
              <span className="ml-2">
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full max-w-[200px] bg-gray-900 rounded-md shadow-lg z-20 border border-gray-700 animate-fadeInUp mx-auto overflow-hidden">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`relative block w-full text-left px-4 py-3 text-base transition-colors duration-200
                      ${
                        selectedCategory === cat
                          ? "text-orange-500"
                          : "text-gray-300 hover:text-orange-400 hover:bg-gray-800"
                      }
                      before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-orange-500 before:transition-transform before:duration-300
                      ${
                        selectedCategory === cat
                          ? "before:scale-x-100"
                          : "before:scale-x-0"
                      }
                      `}
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {cat === "All"
                      ? "🍊 All Projects"
                      : cat === "WebDev"
                      ? "</> Web Development"
                      : cat === "AI/ML"
                      ? "⚙️ AI/Machine Learning"
                      : "🖥️ Desktop Apps"}{" "}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Filters (Desktop: Horizontal Bar) */}
          <div className="hidden md:flex justify-center mt-4 gap-10 flex-wrap z-10"> {/* Added z-10 */}
            {categories.map((cat) => (
              <button
                key={cat}
                className={`relative px-4 py-2 text-xl font-semibold transition-all duration-300 group
                  ${
                    selectedCategory === cat
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-orange-300"
                  }
                  `}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All"
                  ? "🍊"
                  : cat === "WebDev"
                  ? "</>"
                  : cat === "AI/ML"
                  ? "⚙️"
                  : "🖥️"}{" "}
                {cat}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transition-transform duration-300 origin-center ${
                    selectedCategory === cat
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-50"
                  }`}
                ></span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Carousel */}
        <div className="relative w-full mt-6 md:mt-10 px-4 z-10"> {/* Added z-10 */}
          <div
            className="relative h-[350px] md:h-[500px] max-w-full md:max-w-7xl mx-auto flex items-center justify-between"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: "1200px", minHeight: '350px' }}
          >
            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              className="hidden md:block z-50 text-white hover:text-orange-500 transition-all duration-300 focus:outline-none"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="relative flex justify-center items-center h-full w-full">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={`${selectedCategory}-${index}`}
                  project={project}
                  activeIndex={activeIndex}
                  index={index}
                  totalProjects={filteredProjects.length}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="hidden md:block z-50 text-white hover:text-orange-500 transition-all duration-300 focus:outline-none"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 md:mt-12 gap-3 z-10"> {/* Added z-10 */}
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === activeIndex
                    ? "w-6 h-2 md:w-8 md:h-3 bg-orange-500"
                    : "w-2 h-2 md:w-3 md:h-3 bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"></div> {/* Adjusted z-index */}
      </section>
    </>
  );
};

export default ProjectShowcase;