// D:\Programs\Projects\portfolio\components\Skills.jsx
import React from "react";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "Framer Motion",
  "Figma",
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-gray-900 text-white"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        Skills
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 transition rounded-lg shadow-md text-sm md:text-base"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
