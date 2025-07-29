import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "WebDev", "AI/ML", "Desktop"];

const projects = [
  {
    title: "Portfolio Website",
    description: "Built using React and Tailwind CSS.",
    domain: "WebDev",
  },
  {
    title: "ML Classifier",
    description: "A CNN model to classify X-ray images.",
    domain: "AI/ML",
  },
  {
    title: "ToDo App",
    description: "Built with Electron and React.",
    domain: "Desktop",
  },
  {
    title: "Blog Platform",
    description: "A markdown-powered blog built with Next.js.",
    domain: "WebDev",
  },
  {
    title: "Object Detection",
    description: "YOLOv5 for real-time detection.",
    domain: "AI/ML",
  },
];

const Projects = () => {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = useRef();

  const filteredProjects =
    selectedDomain === "All"
      ? projects
      : projects.filter(
          (proj) =>
            proj.domain.trim().toLowerCase() ===
            selectedDomain.trim().toLowerCase()
        );

  useEffect(() => {
    setVisibleCards([]);
  }, [filteredProjects]);

  const handleScroll = (dir) => {
    const cardWidth = 260; // width + margin
    const newScroll = dir === "left" ? scrollX - cardWidth : scrollX + cardWidth;
    scrollRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
    setScrollX(newScroll);
  };

  return (
    <section className="min-h-screen bg-black text-white py-20 px-4 md:px-16 relative">
      {/* Heading with image */}
      <div className="flex items-center justify-start mb-10 gap-6">
        <img
          src="/assets/fishing.png"
          alt="Fishing"
          className="h-24 w-24 object-contain"
        />
        <h1 className="text-6xl md:text-8xl font-bold leading-tight text-orange-500">
          PROJECTS
        </h1>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedDomain(cat)}
            className={`px-5 py-2 rounded-full border ${
              selectedDomain === cat
                ? "bg-orange-500 text-white"
                : "text-orange-500 border-orange-500 hover:bg-orange-600 hover:text-white"
            } transition-colors duration-300`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Carousel */}
      <div className="relative">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange-500 p-2 rounded-full hover:bg-orange-600"
        >
          <ChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth px-8"
        >
          <AnimatePresence>
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800 rounded-xl min-w-[240px] max-w-[240px] p-4 flex-shrink-0 shadow-lg hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/assets/contact.jpg"
                  alt={proj.title}
                  className="rounded-md mb-4 object-cover w-full h-32"
                />
                <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                <p className="text-sm text-gray-400">{proj.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange-500 p-2 rounded-full hover:bg-orange-600"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Projects;
