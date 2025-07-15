import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  "FRONTEND": {
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind", "SASS"],
    icon: "🪐",
    color: "from-blue-500 to-cyan-400"
  },
  "BACKEND": {
    skills: ["Node.js", "Python", "Java", "Flask", "REST APIs"],
    icon: "🚀",
    color: "from-green-500 to-emerald-400"
  },
  "AI / ML": {
    skills: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "Scikit-learn"],
    icon: "🧠",
    color: "from-purple-500 to-pink-400"
  },
  "DATABASE": {
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
    icon: "🛰️",
    color: "from-orange-500 to-red-400"
  },
  "TOOLS": {
    skills: ["Git", "VS Code", "Jupyter", "WordPress"],
    icon: "🔧",
    color: "from-indigo-500 to-purple-400"
  },
  "SYSTEMS": {
    skills: ["Linux", "Windows", "OOP", "Data Structures"],
    icon: "💻",
    color: "from-teal-500 to-cyan-400"
  }
};

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  return (
    <>
      <section
        id="skills"
        ref={sectionRef}
        className="relative min-h-screen px-6 py-24 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      >
        {/* Decorative space constellation background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%">
            {[...Array(40)].map((_, i) => (
              <circle
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r={Math.random() * 1.5 + 0.5}
                fill="#fff"
                opacity="0.3"
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <line
                key={i}
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="#aaa"
                strokeOpacity="0.1"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        {/* Section Title */}
        <h2
          className={`text-5xl md:text-7xl font-bold z-10 mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-orange-500">TECH</span> SKILLS
        </h2>

        {/* Skill Cards */}
        <div className="z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
          {Object.entries(skillsData).map(([category, { skills, color, icon }], i) => (
            <div
              key={category}
              className={`relative border border-gray-700 rounded-2xl p-6 bg-gray-900/40 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-orange-500 transition-all transform ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Planet Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl">{icon}</div>
                <h3 className="text-lg font-semibold tracking-wide">{category}</h3>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`text-xs bg-gradient-to-br ${color} text-white px-3 py-1 rounded-full shadow-sm transition-all hover:scale-105`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Cosmic ring effect */}
              <div
                className={`absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${color}`}
              ></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Skills;
