import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const ProjectCard = ({ project }) => (
  <div className="bg-[#1f2937] rounded-2xl p-4 w-[300px] min-w-[300px] shrink-0 text-white shadow-lg">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 rounded-full text-white font-semibold text-sm"
    >
      Visit Project →
    </a>
  </div>
);

const ProjectShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sliderRef = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += 1;
        if (
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval.current);
  }, [filteredProjects]);

  return (
    <section className="relative pt-40 md:pt-52 min-h-screen overflow-hidden">
      <div className="absolute top-10 right-0 z-0 opacity-60">
        <img
          src="/assets/projects/fishing.png"
          alt="fishing"
          className="w-[700px]"
        />
      </div>

      <h2 className="text-5xl font-extrabold text-center text-white relative z-10">
        <span className="text-orange-500">PROJECT</span> SHOWCASE
      </h2>

      <div className="flex justify-center mt-10 gap-4 flex-wrap relative z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`rounded-full px-6 py-2 text-lg transition-all duration-300 shadow-md font-medium border ${
              selectedCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-900 text-gray-300 border-gray-600"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === "All"
              ? "🍊"
              : cat === "WebDev"
              ? "</>"
              : cat === "AI/ML"
              ? "⚙️"
              : "🖥️"} {cat}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-[95vw] mx-auto mt-20 overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scroll-smooth whitespace-nowrap no-scrollbar px-10 py-4"
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={() =>
            (sliderRef.current.scrollLeft -= 300)
          }
          className="bg-[#111827] p-3 rounded-full shadow-lg"
        >
          <ChevronLeft className="text-white" />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={() =>
            (sliderRef.current.scrollLeft += 300)
          }
          className="bg-[#111827] p-3 rounded-full shadow-lg"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>
    </section>
  );
};

export default ProjectShowcase;
