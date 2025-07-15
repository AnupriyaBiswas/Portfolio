// D:\Programs\Projects\portfolio\components\Projects.jsx
import React from "react";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio built with Next.js and Tailwind CSS, showcasing my work and skills.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://github.com/nevo/portfolio",
  },
  {
    title: "Weather App",
    description:
      "A minimal weather app using the OpenWeatherMap API to display real-time weather updates.",
    tech: ["React", "API", "CSS Modules"],
    link: "https://github.com/nevo/weather-app",
  },
  {
    title: "Blog Platform",
    description:
      "A Markdown-based blogging platform with syntax highlighting, search, and responsive design.",
    tech: ["Next.js", "MDX", "Tailwind"],
    link: "https://github.com/nevo/blog-platform",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        Projects
      </h2>
      <div className="grid gap-10 md:grid-cols-2">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
