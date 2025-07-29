import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "WebDev", "AI/ML", "Desktop"];

const projects = [
  {
    title: "Portfolio Website",
    description: "A responsive developer portfolio built using Next.js and Tailwind CSS.",
    image: "/assets/projects/portfolio.png",
    link: "https://yourportfolio.com",
    category: "WebDev",
  },
  {
    title: "AI Chatbot",
    description: "An AI-powered chatbot using NLP and Transformer models for real-time responses.",
    image: "/assets/projects/chatbot.png",
    link: "https://aibot.com",
    category: "AI/ML",
  },
  {
    title: "Desktop Notes App",
    description: "A cross-platform desktop notes app built with Electron and React.",
    image: "/assets/projects/notesapp.png",
    link: "https://notesapp.com",
    category: "Desktop",
  },
  {
    title: "Stock Price Predictor",
    description: "Predicts stock prices using LSTM networks trained on historical data.",
    image: "/assets/projects/stocks.png",
    link: "https://stockpredict.com",
    category: "AI/ML",
  },
];

const ProjectCard = ({ project, className }) => {
  return (
    <div
      className={`bg-[#1f2937] rounded-2xl p-6 max-w-xl w-full text-white shadow-lg ${className}`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 rounded-full text-white font-semibold"
      >
        Visit Project →
      </a>
    </div>
  );
};

const ProjectShowcase = () => {
  const [current, setCurrent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
    setCurrent(0);
  }, [selectedCategory]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [current, filteredProjects]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setCurrent((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative pt-40 md:pt-52 min-h-screen">
      <h2 className="text-5xl font-extrabold text-center text-white">
        <span className="text-orange-500">PROJECT</span> SHOWCASE
      </h2>

      <div className="flex justify-center mt-10 gap-4 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            className={`rounded-full px-6 py-2 text-lg transition-all duration-300 shadow-md ${selectedCategory === cat ? "bg-orange-500 text-white" : "bg-gray-900 text-gray-300"}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === "All" ? (
              <span className="mr-2">🍊</span>
            ) : cat === "WebDev" ? (
              <span className="mr-2">{"</>"}</span>
            ) : cat === "AI/ML" ? (
              <span className="mr-2">⚙️</span>
            ) : (
              <span className="mr-2">🖥️</span>
            )}
            {cat}
          </Button>
        ))}
      </div>

      <div className="relative w-full max-w-6xl mx-auto mt-20 h-[520px] overflow-hidden">
        <AnimatePresence initial={false} custom={current}>
          <motion.div
            key={current}
            custom={current}
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute w-full flex justify-center"
          >
            <ProjectCard
              project={filteredProjects[current]}
              className="transform scale-100 md:scale-105 transition-transform duration-1000 ease-in-out"
            />
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#111827] p-3 rounded-full shadow-lg z-10"
          onClick={handlePrev}
        >
          <ChevronLeft className="text-white" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#111827] p-3 rounded-full shadow-lg z-10"
          onClick={handleNext}
        >
          <ChevronRight className="text-white" />
        </button>
      </div>
    </section>
  );
};

export default ProjectShowcase;
