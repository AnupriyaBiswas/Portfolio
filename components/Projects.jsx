import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const categories = ["All", "WebDev", "AI/ML", "Desktop"];

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A responsive developer portfolio built using Next.js and Tailwind CSS.",
    image: "/assets/Portfolio.jpg",
    link: "https://yourportfolio.com",
    category: "WebDev",
  },
  {
    title: "Musical Academy",
    description:
      "Interactive platform to manage and explore music learning resources.",
    image: "/assets/musicalAcademy.jpg",
    link: "https://musical-academy-b3c8.vercel.app/",
    category: "WebDev",
    collaborators: [
      {
        name: "Suman Prasad",
        portfolio: "https://sumanprasad.in",
      },
    ],
  },
  {
    title: "Paul Delta Arc Website",
    description:
      "A  modern, responsive Official Business site built for an MEP Business.",
    image: "/assets/PaulDeltaArc.jpg",
    link: "https://www.pauldeltaarc.com/",
    category: "WebDev",
    collaborators: [
      {
        name: "Suman Prasad",
        portfolio: "https://sumanprasad.in",
      },
    ],
  },
  {
    title: "Stock Price Predictor",
    description: "Predicts stock prices using LSTM networks trained on historical data.",
    image: "/assets/stockMarketPrediction.jpg",
    link: "https://stockpredict.com",
    category: "AI/ML",
  },
  {
    title: "Hate Speech Recognition",
    description: "A machine learning model that detects and classifies hate speech in text.",
    image: "/assets/hateSpeechRecognition.jpg",
    link: "https://github.com/AnupriyaBiswas/Hate-Speech-Recognition",
    category: "AI/ML",
  },
  {
    title: "Flat File System",
    description: "A lightweight file system built for efficient storage and quick access.",
    image: "/assets/flatFileSystem.jpg",
    link: "https://github.com/AnupriyaBiswas/Flat-File-System",
    category: "Desktop",
  },
  {
    title: "Glaucoma Detection",
    description: "A deep learning tool using U-Net for glaucoma detection from retinal fundus images.",
    image: "/assets/GlaucomaDetection.jpg",
    link: "https://github.com/AnupriyaBiswas/Glaucoma-Detection",
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
      translateXValue = distance > 0 ? `${desktopTranslateX1}px` : `${-desktopTranslateX1}px`;
    } else if (absDistance === 2) {
      translateXValue = distance > 0 ? `${desktopTranslateX2}px` : `${-desktopTranslateX2}px`;
    } else {
      const desktopFurtherVal =
        desktopTranslateX2 + (absDistance - 2) * desktopTranslateXFurther;
      translateXValue =
        distance > 0 ? `${desktopFurtherVal}px` : `${-desktopFurtherVal}px`;
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

  const getZIndex = () => 100 - absDistance;
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
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 w-[280px] md:w-[320px] text-white shadow-2xl border border-gray-700 hover:border-orange-500 transition-all duration-500">
        <div className="relative overflow-hidden rounded-lg mb-4 group">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-lg font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-2 leading-relaxed">
          {project.description}
        </p>

        {project.collaborators && project.collaborators.length > 0 && (
          <p className="text-gray-400 text-xs mb-4">
            In collaboration with{" "}
            {project.collaborators.map((collab, idx) => (
              <span key={idx}>
                <a
                  href={collab.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline"
                >
                  {collab.name}
                </a>
                {idx < project.collaborators.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}

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

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const swipeThreshold = 50;

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
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };
  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
    const diffX = touchEndX - touchStartX;
    if (diffX > swipeThreshold) handlePrevious();
    else if (diffX < -swipeThreshold) handleNext();
    setIsAutoPlaying(true);
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section className="relative pt-20 md:pt-32 min-h-screen overflow-hidden transparent">
        {/* Fishing Image */}
        <div className="absolute top-15 right-4 z-50 hidden md:block">
          <Image
            src="/assets/fishing.png"
            alt="Decorative fishing illustration"
            width={162}
            height={222}
          />
        </div>

        {/* Mobile Fishing Image */}
        <div className="relative flex justify-center w-full mt-2 mb-0 md:hidden z-10">
          <Image
            src="/assets/fishing.png"
            alt="Decorative fishing illustration"
            width={60}
            height={82}
            className="w-auto h-auto"
          />
        </div>

        {/* Hero Heading */}
        <div className="relative z-10 px-4 md:px-16 mt-0">
          <h1 className="text-4xl md:text-8xl font-bold leading-tight text-center mb-6">
            <span className="text-orange-500">PROJECT </span>
            <span className="text-white">SHOWCASE</span>
          </h1>

          {/* Categories */}
          <div className="hidden md:flex justify-center mt-4 gap-10 flex-wrap z-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 text-xl font-semibold transition-all duration-300 group ${selectedCategory === cat
                    ? "text-orange-500"
                    : "text-gray-400 hover:text-orange-300"
                  }`}
              >
                {cat}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transition-transform duration-300 origin-center ${selectedCategory === cat
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-50"
                    }`}
                ></span>
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full mt-6 md:mt-10 px-4 z-10">
          <div
            className="relative h-[350px] min-h-[450px] md:h-[500px] max-w-full md:max-w-7xl mx-auto flex items-center justify-between"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: "1200px" }}
          >
            <button
              onClick={handlePrevious}
              className="hidden md:block z-50 text-white hover:text-orange-500 transition-all duration-300"
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

            <button
              onClick={handleNext}
              className="hidden md:block z-50 text-white hover:text-orange-500 transition-all duration-300"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 md:mt-12 gap-3 z-10">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-500 rounded-full ${index === activeIndex
                    ? "w-6 h-2 md:w-8 md:h-3 bg-orange-500"
                    : "w-2 h-2 md:w-3 md:h-3 bg-gray-600 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectShowcase;
