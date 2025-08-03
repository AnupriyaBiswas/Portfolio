import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const categories = ["All", "WebDev", "AI/ML", "Desktop"];

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A responsive developer portfolio built using Next.js and Tailwind CSS.",
    image: "/assets/Portfolio.jpg",
    link: "https://yourportfolio.com",
    github: "https://github.com/AnupriyaBiswas/Portfolio",
    category: "WebDev",
  },
  {
    title: "Musical Academy",
    description:
      "Interactive platform to manage and explore music learning resources.",
    image: "/assets/musicalAcademy.jpg",
    link: "https://musical-academy-b3c8.vercel.app/",
    github: "https://github.com/AnupriyaBiswas/MusicalAcademy",
    category: "WebDev",
    collaborators: [{ name: "Suman Prasad", portfolio: "https://sumanprasad.in" }],
  },
  {
    title: "Paul Delta Arc Website",
    description:
      "A modern, responsive Official Business site built for an MEP Business.",
    image: "/assets/PaulDeltaArc.jpg",
    link: "https://www.pauldeltaarc.com/",
    github: "https://github.com/AnupriyaBiswas/PaulDeltaArc",
    category: "WebDev",
    collaborators: [{ name: "Suman Prasad", portfolio: "https://sumanprasad.in" }],
  },
  {
    title: "Stock Price Predictor",
    description: "Predicts stock prices using LSTM networks trained on historical data.",
    image: "/assets/stockMarketPrediction.jpg",
    link: "https://stockpredict.com",
    github: null, // will trigger alert
    category: "AI/ML",
  },
  {
    title: "Hate Speech Recognition",
    description: "A machine learning model that detects and classifies hate speech in text.",
    image: "/assets/hateSpeechRecognition.jpg",
    link: "https://github.com/AnupriyaBiswas/Hate-Speech-Recognition",
    github: "https://github.com/AnupriyaBiswas/Hate-Speech-Recognition",
    category: "AI/ML",
  },
  {
    title: "Flat File System",
    description: "A lightweight file system built for efficient storage and quick access.",
    image: "/assets/flatFileSystem.jpg",
    link: "https://github.com/AnupriyaBiswas/Flat-File-System",
    github: "https://github.com/AnupriyaBiswas/Flat-File-System",
    category: "Desktop",
  },
  {
    title: "Glaucoma Detection",
    description:
      "A deep learning tool using U-Net for glaucoma detection from retinal fundus images.",
    image: "/assets/GlaucomaDetection.jpg",
    link: "https://github.com/AnupriyaBiswas/Glaucoma-Detection",
    github: "https://github.com/AnupriyaBiswas/Glaucoma-Detection",
    category: "AI/ML",
  },
];

const ProjectCard = ({ project, activeIndex, index, totalProjects, onClick }) => {
  const getCircularDistance = () => {
    let distance = index - activeIndex;
    if (distance > totalProjects / 2) distance -= totalProjects;
    else if (distance < -totalProjects / 2) distance += totalProjects;
    return distance;
  };

  const distance = getCircularDistance();
  const absDistance = Math.abs(distance);

  const getTransform = () => {
    const desktopTranslateX1 = 120;
    const desktopTranslateX2 = 240;
    const desktopTranslateXFurther = 80;

    if (absDistance === 0) return "translateX(0) scale(1) rotateY(0deg)";
    let translateXValue;

    if (absDistance === 1) {
      translateXValue = distance > 0 ? `${desktopTranslateX1}px` : `${-desktopTranslateX1}px`;
    } else if (absDistance === 2) {
      translateXValue = distance > 0 ? `${desktopTranslateX2}px` : `${-desktopTranslateX2}px`;
    } else {
      const desktopFurtherVal = desktopTranslateX2 + (absDistance - 2) * desktopTranslateXFurther;
      translateXValue = distance > 0 ? `${desktopFurtherVal}px` : `${-desktopFurtherVal}px`;
    }

    let scale = absDistance === 1 ? 0.85 : absDistance === 2 ? 0.7 : 0.55;
    let rotateY =
      absDistance === 1
        ? distance > 0
          ? -15
          : 15
        : absDistance === 2
          ? distance > 0
            ? -25
            : 25
          : distance > 0
            ? -35
            : 35;

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

  const handleGitHubClick = (e) => {
    e.stopPropagation();
    if (project.github) {
      window.open(project.github, "_blank");
    } else {
      alert("GitHub repository not available for this project.");
    }
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
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl px-4 py-6 
                w-[260px] md:w-[340px] text-white shadow-2xl 
                border border-gray-700 hover:border-orange-500 
                transition-all duration-500 flex flex-col justify-between">
        <div>
          <div className="relative overflow-hidden rounded-lg mb-4 group">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={200}
              className="w-full h-36 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* GitHub icon */}
            <button
              onClick={handleGitHubClick}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
            >
              <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-base md:text-lg font-bold mb-1">{project.title}</h3>
          <p className="text-gray-300 text-xs md:text-sm mb-3 leading-relaxed">
            {project.description}
          </p>
          {project.collaborators && project.collaborators.length > 0 && (
            <p className="text-gray-400 text-xs mb-3">
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
        </div>

        {/* Live Demo button aligned left */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 
               hover:from-orange-600 hover:to-orange-700 transition-all duration-300 
               px-3 py-1.5 rounded-full text-white font-medium text-xs md:text-sm shadow-lg 
               hover:shadow-orange-500/30 self-start"
        >
          Live Demo →
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
    setFilteredProjects(
      selectedCategory === "All"
        ? projects
        : projects.filter((project) => project.category === selectedCategory)
    );
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
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  return (
    <section className="relative pt-20 md:pt-32 min-h-screen overflow-hidden transparent">
      <div className="relative z-10 px-4 md:px-16 mt-0">
        <h1 className="text-3xl md:text-6xl font-bold leading-tight text-center mb-6">
          <span className="text-orange-500">PROJECT </span>
          <span className="text-white">SHOWCASE</span>
        </h1>

        {/* Categories */}
        <div className="flex justify-center mt-4 gap-4 md:gap-10 flex-wrap z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-3 py-1 text-sm md:text-xl font-semibold transition-all duration-300 group ${selectedCategory === cat
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
          className="relative h-[380px] md:h-[500px] max-w-full md:max-w-7xl mx-auto flex items-center justify-between"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          style={{ perspective: "1200px" }}
        >
          <button
            onClick={handlePrevious}
            className="hidden md:block z-50 text-white hover:text-orange-500 transition-all duration-300"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div className="relative flex justify-center items-center h-full w-full">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${selectedCategory}-${index}`}
                project={project}
                activeIndex={activeIndex}
                index={index}
                totalProjects={filteredProjects.length}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="hidden md:block z-50 text-white hover:text-orange-500 transition-all duration-300"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 md:mt-12 gap-2 md:gap-3 z-10">
          {filteredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-500 rounded-full ${index === activeIndex
                  ? "w-5 h-2 md:w-6 md:h-3 bg-orange-500"
                  : "w-2 h-2 md:w-3 md:h-3 bg-gray-600 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
