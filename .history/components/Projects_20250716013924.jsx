import React, { useEffect, useRef, useState } from "react";

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
      "Classifies Parkinson’s gait from normal gait using multimodal EMG + IMU fusion using CNN + RNN.",
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
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const filteredProjects =
    selectedDomain === "All"
      ? projects
      : projects.filter((proj) => proj.domain.trim().toLowerCase() === selectedDomain.trim().toLowerCase()
      );

  useEffect(() => {
  setVisibleCards([]);
  cardRefs.current = [];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleCards((prev) => [...new Set([...prev, entry.target])]);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Defer observing until refs are attached
  const timeout = setTimeout(() => {
    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
  }, 0);

  return () => {
    clearTimeout(timeout);
    observer.disconnect();
  };
}, [filteredProjects]);


  return (
    <section
      id="projects"
      className="min-h-screen bg-black text-white relative overflow-visible px-4 md:px-20 py-20"
    >
      {/* Fishing Image */}
      <img
        src="/assets/fishing.png"
        alt="Fishing Astronaut"
        className="absolute top-12 right-24 w-[85px] sm:w-[110px] md:w-[135px] lg:w-[160px] z-20"
        style={{ transform: "translate(50%, -20%)" }}
      />

      {/* Heading */}
      <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-10 text-left inline-block gap-4">
        <span className="text-orange-500 block">PROJECT</span>
        <span className="text-white block">SHOWCASE</span>
      </h2>

      {/* Filter Controls (moved here) */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
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
        <div className="hidden md:flex flex-wrap gap-3 animate-slide-in">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`text-base font-semibold px-4 py-2 rounded-full transition-all duration-300 ${selectedDomain === domain
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "text-gray-400 hover:text-white border border-gray-700"
                }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`transition-all duration-1000 ease-out relative ... ${visibleCards.includes(cardRefs.current[index])
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
              }`}
            style={{
              transitionDelay: `${0.3 + index * 0.2}s`,
            }}
          >
            {/* card content */}
          </div>
        ))}

      </div>

      {/* Slide-in animation for domain tabs */}
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
