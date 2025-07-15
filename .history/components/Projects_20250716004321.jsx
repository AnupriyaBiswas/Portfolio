// Projects.jsx
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
    const observer = new IntersectionObserver([
      (entry) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
    ], { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen bg-black text-white relative overflow-visible"
    >
      {/* 🌠 Background Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(150)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const opacity = Math.random() * 0.8 + 0.2;
          const left = Math.random() * 100;
          const duration = 15 + Math.random() * 10;
          const delay = Math.random() * 3;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${Math.random() * 100}%`,
                opacity,
                animation: `fall ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>

      {/* 🚀 Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 md:px-16 pt-36 pb-12">
        {/* Fishing Image */}
        <img
          src="/assets/fishing.png"
          alt="Fishing"
          className="w-52 md:w-72 lg:w-96 -mt-24 md:mt-0 md:-ml-16 object-contain"
        />

        {/* Heading */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center md:text-right text-white whitespace-nowrap">
          <span className="text-orange-500">PROJECT</span>{" "}
          <span>SHOWCASE</span>
        </h2>
      </div>

      {/* 🧩 Projects Grid */}
      <div className="relative z-10 grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 md:px-16 pb-24">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] transition duration-300"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <a
                href={project.link}
                className="text-orange-500 hover:underline text-sm"
                target="_blank"
              >
                View Code ↗
              </a>
              <span className="text-xs text-gray-400">
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
