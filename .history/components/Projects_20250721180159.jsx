import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../constants/projects";
import ProjectCard from "./projectCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "WebDev", "AI/ML", "Desktop"];

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
    }, 4000); // Slow down transition
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
    <section className="relative pt-28 md:pt-36">
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

      <div className="relative w-full max-w-6xl mx-auto mt-20 h-[500px] overflow-hidden">
        <AnimatePresence initial={false} custom={current}>
          <motion.div
            key={current}
            custom={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="absolute w-full flex justify-center"
          >
            <ProjectCard
              project={filteredProjects[current]}
              className="transform scale-[1.05] md:scale-[1.2] transition-transform duration-1000 ease-in-out"
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
