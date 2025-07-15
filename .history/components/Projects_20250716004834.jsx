import React, { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio built with Next.js and Tailwind CSS, showcasing my work and skills.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://github.com/nevo/portfolio",
    status: "Live",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Weather App",
    description:
      "A minimal weather app using the OpenWeatherMap API to display real-time weather updates.",
    tech: ["React", "API", "CSS Modules"],
    link: "https://github.com/nevo/weather-app",
    status: "Completed",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    title: "Blog Platform",
    description:
      "A Markdown-based blogging platform with syntax highlighting, search, and responsive design.",
    tech: ["Next.js", "MDX", "Tailwind"],
    link: "https://github.com/nevo/blog-platform",
    status: "In Progress",
    gradient: "from-purple-500 to-pink-400",
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen bg-black text-white relative overflow-visible px-4 md:px-20 py-20"
    >
      {/* Fishing Image */}
      <img
        src="/assets/fishing.png"
        alt="Fishing Astronaut"
        className="absolute top-10 right-20 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] z-20"
        style={{ transform: "translate(50%, -20%)" }}
      />

      {/* Heading */}
      <h2
        className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-20 text-left transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: isVisible ? "0.2s" : "0s" }}
      >
        <span className="text-orange-500 block">PROJECT</span>
        <span className="text-white block">SHOWCASE</span>
      </h2>

      {/* Projects List */}
      <div className="space-y-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`transition-all duration-1000 ease-out relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 p-8 md:p-10 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? `${0.4 + index * 0.2}s` : "0s",
            }}
          >
            <div className="mb-4 text-sm font-medium text-gray-300 flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  project.status === "Live"
                    ? "bg-green-500"
                    : project.status === "Completed"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
                } animate-pulse`}
              ></div>
              <span>{project.status}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-800/70 text-gray-300 rounded-full text-sm font-medium border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Explore Project
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;