import React, { useRef, useState, useEffect } from "react";
 import { ChevronLeft, ChevronRight } from "lucide-react";
 import Image from 'next/image'; // Import the Image component for optimized image loading

 const categories = ["All", "WebDev", "AI/ML", "Desktop"];

 const projects = [
  {
    title: "Portfolio Website",
    description:
      "A responsive developer portfolio built using Next.js and Tailwind CSS.",
    image: "/assets/contact.jpg",
    link: "https://yourportfolio.com",
    category: "WebDev",
  },
  {
    title: "AI Chatbot",
    description:
      "An AI-powered chatbot using NLP and Transformer models for real-time responses.",
    image: "/assets/contact.jpg",
    link: "https://aibot.com",
    category: "AI/ML",
  },
  {
    title: "Desktop Notes App",
    description: "A cross-platform desktop notes app built with Electron and React.",
    image: "/assets/contact.jpg",
    link: "https://notesapp.com",
    category: "Desktop",
  },
  {
    title: "Stock Price Predictor",
    description: "Predicts stock prices using LSTM networks trained on historical data.",
    image: "/assets/contact.jpg",
    link: "https://stockpredict.com",
    category: "AI/ML",
  },
  {
    title: "E-commerce Platform",
    description:
      "Full-stack e-commerce solution with payment integration and admin dashboard.",
    image: "/assets/contact.jpg",
    link: "https://ecommerce.com",
    category: "WebDev",
  },
  {
    title: "Computer Vision App",
    description:
      "Real-time object detection and classification using OpenCV and TensorFlow.",
    image: "/assets/contact.jpg",
    link: "https://vision.com",
    category: "AI/ML",
  },
 ];

 // Added onClick prop to ProjectCard
 const ProjectCard = ({ project, activeIndex, index, totalProjects, onClick }) => {
  // Calculate the distance with circular logic
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

  // Calculate transform based on position relative to center
  const getTransform = () => {
    // Original desktop values
    const desktopTranslateX1 = 120;
    const desktopTranslateX2 = 240;
    const desktopTranslateXFurther = 80;

    // Mobile capped values
    const mobileTranslateX1 = 80; // Example: tighter on mobile
    const mobileTranslateX2 = 160; // Example: tighter on mobile
    const mobileTranslateXFurther = 50; // Example: tighter increment on mobile

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
      const mobileFurtherVal =
        mobileTranslateX2 + (absDistance - 2) * mobileTranslateXFurther;
      translateXValue =
        distance > 0
          ? `var(--mobile-cap-prefix, ${desktopFurtherVal}px)`
          : `var(--mobile-cap-prefix, ${-desktopFurtherVal}px)`;
    }

    // Now, combine with scale and rotation
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
    // Fade out cards that are too far
    if (absDistance > 2 && absDistance <= totalProjects / 2) return 0.3;
    return 0; // Hide cards that are effectively "behind"
  };

  return (
    <div
      className="absolute left-1/2 top-0 transition-all duration-700 ease-out"
      style={{
        transform: `translateX(-50%) ${getTransform()}`,
        zIndex: getZIndex(),
        opacity: getOpacity(),
        transformStyle: "preserve-3d",
        perspective: "1000px",
        // Only allow pointer events for visible cards to prevent clicks on hidden ones
        pointerEvents: absDistance > totalProjects / 2 ? "none" : "auto",
      }}
      data-distance={distance} // IMPORTANT: Add this for responsive CSS in style jsx to work
      onClick={onClick} // Pass the onClick handler
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 w-[280px] md:w-[320px] text-white shadow-2xl border border-gray-700 hover:border-orange-500 transition-all duration-500">
        {" "}
        {/* Adjusted width for mobile */}
        <div className="relative overflow-hidden rounded-lg mb-4 group">
          <img
            src="/assets/contact.jpg"
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
          // Prevent the card click from also triggering the link click
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  // Touch swipe states
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const swipeThreshold = 50; // Minimum pixels to count as a swipe

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
    setActiveIndex(0); // Reset active index when category changes
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

  // New handler for clicking a card
  const handleCardClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Pause autoplay when user manually interacts
    // You might want to resume autoplay after a delay here if desired
    // For example: setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches()[0].clientX);
    setIsAutoPlaying(false); // Pause autoplay during touch interaction
  };

  const handleTouchMove = (e) => {
    // Optional: prevent default vertical scrolling during horizontal swipe
    // const currentTouchX = e.targetTouches()[0].clientX;
    // const diffX = currentTouchX - touchStartX;
    // if (Math.abs(diffX) > 10) { // small threshold
    //   e.preventDefault();
    // }
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches()[0].clientX);
    const diffX = touchEndX - touchStartX;

    if (diffX > swipeThreshold) {
      // Swiped right
      handlePrevious();
    } else if (diffX < -swipeThreshold) {
      // Swiped left
      handleNext();
    }
    setIsAutoPlaying(true); // Resume autoplay after touch interaction
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

        /* Applying responsive translation for ProjectCard via media query */
        @media (max-width: 767px) {
          /* Targeting screens up to 767px (before Tailwind's md breakpoint) */
          .project-card-container { /* Add a class to the container for easier targeting */
            transform: translateX(-50%); /* Keep the base centering */
            &.distance-1 {
              transform: translateX(-50%) translateX(80px) scale(0.85)
                rotateY(-15deg) !important;
            }
            &.distance-minus-1 {
              transform: translateX(-50%) translateX(-80px) scale(0.85)
                rotateY(15deg) !important;
            }
            &.distance-2 {
              transform: translateX(-50%) translateX(160px) scale(0.7)
                rotateY(-25deg) !important;
            }
            &.distance-minus-2 {
              transform: translateX(-50%) translateX(-160px) scale(0.7)
                rotateY(25deg) !important;
            }
          }
        }
      `}</style>

      <section className="relative pt-20 md:pt-32 min-h-screen overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute top-10 right-0 z-0 opacity-40">
          <img
            src="/assets/projects/fishing.png"
            alt="fishing"
            className="w-[700px] opacity-60"
          />
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute top-40 right-40 w-2 h-2 bg-orange-500 rounded-full"
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-60 left-20 w-1 h-1 bg-white rounded-full"
          style={{ animation: "pulse 3s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full"
          style={{ animation: "pulse 4s ease-in-out infinite" }}
        ></div>

        {/* Hero-style Heading - One Line */}
        <div className="relative z-10 px-4 md:px-16">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight text-center mb-8">
            <span className="text-orange-500">PROJECT </span>
            <span className="text-white">SHOWCASE</span>
          </h1>

          {/* Category Filters (Mobile: Dropdown) */}
          <div className="flex justify-center mt-8 gap-6 flex-wrap md:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              // Styled to look like a selected tab
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
                {" "}
                {/* Added overflow-hidden for rounded corners */}
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`relative block w-full text-left px-4 py-3 text-base transition-colors duration-200
                      ${
                        selectedCategory === cat
                          ? "text-orange-500" // Active text color
                          : "text-gray-300 hover:text-orange-400 hover:bg-gray-800" // Inactive text and hover
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
          <div className="hidden md:flex justify-center mt-8 gap-10 flex-wrap">
            {" "}
            {/* Increased gap for more space */}
            {categories.map((cat) => (
              <button
                key={cat}
                className={`relative px-4 py-2 text-xl font-semibold transition-all duration-300 group
                  ${
                    selectedCategory === cat
                      ? "text-orange-500" // Active text color
                      : "text-gray-400 hover:text-orange-300" // Inactive text and hover
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
                {/* Active indicator */}
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

        {/* 3D Carousel - Glide.js Style */}
        <div className="relative w-full mt-10 md:mt-20 px-4">
          <div
            className="relative h-[400px] md:h-[500px] max-w-full md:max-w-7xl mx-auto flex items-center justify-between" // Added flex for vertical centering
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart} // Add touch event listeners
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: "1200px" }}
          >
            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              className="hidden md:block z-50 text-white hover:text-orange-500 transition-all duration-300 focus:outline-none" // Removed button styles
            >
              <ChevronLeft className="w-10 h-10" /> {/* Increased size for better visibility */}
            </button>

            <div className="relative flex justify-center items-center">
              {filteredProjects.map((project, index) => (
                <div
                  key={`${selectedCategory}-${index}`}
                  className={`absolute left-1/2 top-0 transition-all duration-700 ease-out project-card-container ${ // Added project-card-container class
                    index === activeIndex ? 'distance-0' :
                      index === activeIndex + 1 ? 'distance-1' :
                        index === activeIndex - 1 ? 'distance-minus-1' :
                          index === activeIndex + 2 ? 'distance-2' :
                            index === activeIndex - 2 ? 'distance-minus-2' : ''
                  }`}
                  style={{
                    transform: `translateX(-50%) ${getTransformForIndex(index, activeIndex, filteredProjects.length)}`,
                    zIndex: getZIndexForIndex(index, activeIndex, filteredProjects.length),
                    opacity: getOpacityForIndex(index, activeIndex, filteredProjects.length),
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    pointerEvents: Math.abs(index - activeIndex) > filteredProjects.length / 2 ? "none" : "auto",
                  }}
                  data-distance={index - activeIndex}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 w-[280px] md:w-[320px] text-white shadow-2xl border border-gray-700 hover:border-orange-500 transition-all duration-500">
                    <div className="relative overflow-hidden rounded-lg mb-4 group">
                      <img
                        src="/assets/contact.jpg"
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
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="hidden md:block z-50 text-white hover:text-orange-500 transition-all duration-300 focus:outline-none" // Removed button styles
            >
              <ChevronRight className="w-10 h-10" /> {/* Increased size for better visibility */}
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 md:mt-12 gap-3">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === activeIndex
                    ? "w-6 h-2 md:w-8 md:h-3 bg-orange-500" // Adjusted size for mobile
                    : "w-2 h-2 md:w-3 md:h-3 bg-gray-600 hover:bg-gray-400" // Adjusted size for mobile
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

        {/* Top Right Image */}
        <div className="absolute top-4 right-4 z-50">
          <Image src="/assets/fishing.png" alt="Fishing Scene" width={150} height={100} /> {/* Adjust width and height as needed */}
        </div>
      </section>
    </>
  );
 };

 // Helper functions to calculate transform, zIndex, and opacity based on index
 const getTransformForIndex = (index, activeIndex, totalProjects) => {
  const distance = index - activeIndex;
  const absDistance = Math.abs(distance);

  const desktopTranslateX1 = 120;
  const desktopTranslateX2 = 240;
  const desktopTranslateXFurther = 80;

  const mobileTranslateX1 = 80;
  const mobileTranslateX2 = 160;
  const mobileTranslateXFurther = 50;

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
    const mobileFurtherVal =
      mobileTranslateX2 + (absDistance - 2) * mobileTranslateXFurther;
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

 const getZIndexForIndex = (index, activeIndex, totalProjects) => {
  const absDistance = Math.abs(index - activeIndex);
  return 100 - absDistance;
 };

 const getOpacityForIndex = (index, activeIndex, totalProjects) => {
  const absDistance = Math.abs(index - activeIndex);
  if (absDistance === 0) return 1;
  if (absDistance === 1) return 0.8;
  if (absDistance === 2) return 0.6;
  if (absDistance > 2 && absDistance <= totalProjects / 2) return 0.3;
  return 0;
 };

 export default ProjectShowcase;