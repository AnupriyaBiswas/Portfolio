import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const ProjectCard = ({ project, activeIndex, index, totalProjects }) => {
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
    if (absDistance === 0) return "translateX(0) scale(1) rotateY(0deg)";
    if (absDistance === 1) {
      return distance > 0
        ? "translateX(120px) scale(0.85) rotateY(-15deg)"
        : "translateX(-120px) scale(0.85) rotateY(15deg)";
    }
    if (absDistance === 2) {
      return distance > 0
        ? "translateX(240px) scale(0.7) rotateY(-25deg)"
        : "translateX(-240px) scale(0.7) rotateY(25deg)";
    }
    // For cards further out, ensure they are still visible but scaled down
    return distance > 0
      ? `translateX(${
          240 + (absDistance - 2) * 80
        }px) scale(0.55) rotateY(-35deg)`
      : `translateX(${
          -240 - (absDistance - 2) * 80
        }px) scale(0.55) rotateY(35deg)`;
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
        pointerEvents: absDistance > totalProjects / 2 ? "none" : "auto", // Disable interactions for hidden cards
      }}
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 w-[320px] text-white shadow-2xl border border-gray-700 hover:border-orange-500 transition-all duration-500">
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
          <h1 className="text-6xl md:text-8xl font-bold leading-tight text-center mb-16">
            <span className="text-orange-500">PROJECT </span>
            <span className="text-white">SHOWCASE</span>
          </h1>

          {/* Category Filters */}
          <div className="flex justify-center mt-16 gap-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-8 py-3 text-lg transition-all duration-500 shadow-lg font-semibold border-2 transform hover:scale-105 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-orange-500/30"
                    : "bg-gray-900 text-gray-300 border-gray-600 hover:border-orange-400 hover:text-orange-300"
                }`}
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
              </button>
            ))}
          </div>
        </div>

        {/* 3D Carousel - Glide.js Style */}
        <div className="relative w-full mt-20 px-4">
          <div
            className="relative h-[500px] max-w-7xl mx-auto" {/* Changed max-w-6xl to max-w-7xl */}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            style={{ perspective: "1200px" }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${selectedCategory}-${index}`}
                project={project}
                activeIndex={activeIndex}
                index={index}
                totalProjects={filteredProjects.length} // Pass totalProjects for circular logic
              />
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 rounded-full shadow-2xl border border-gray-600 hover:border-orange-500 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 rounded-full shadow-2xl border border-gray-600 hover:border-orange-500 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 gap-3">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === activeIndex
                    ? "w-8 h-3 bg-orange-500"
                    : "w-3 h-3 bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </section>
    </>
  );
};

export default ProjectShowcase;