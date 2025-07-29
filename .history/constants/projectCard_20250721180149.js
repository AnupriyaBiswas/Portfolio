// File: /components/ProjectCard.jsx

import React from "react";

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

export default ProjectCard;
