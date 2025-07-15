import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  "FRONTEND": {
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap", "SASS"],
    color: "from-blue-500 to-cyan-400",
    icon: "skill1.png",
    angle: 0
  },
  "BACKEND": {
    skills: ["Python", "Java", "Node.js", "REST APIs", "Flask", "C/C++"],
    color: "from-green-500 to-emerald-400",
    icon: "skill2.png",
    angle: 60
  },
  "AI / ML": {
    skills: ["Machine Learning", "TensorFlow", "PyTorch", "Keras", "OpenCV", "NumPy", "Pandas", "Scikit-learn"],
    color: "from-purple-500 to-pink-400",
    icon: "skill3.png",
    angle: 120
  },
  "DATABASE": {
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
    color: "from-orange-500 to-red-400",
    icon: "skill4.png",
    angle: 180
  },
  "TOOLS": {
    skills: ["Git", "GitHub", "VS Code", "Android Studio", "Jupyter Notebook", "WordPress"],
    color: "from-indigo-500 to-purple-400",
    icon: "skill5.png",
    angle: 240
  },
  "SYSTEMS": {
    skills: ["Linux (Ubuntu)", "Windows", "Android", "Data Structures", "Algorithms", "OOP"],
    color: "from-teal-500 to-cyan-400",
    icon: "skill6.png",
    angle: 300
  }
};

const Skills = () => {
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.02);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Heading Section */}
      <div className="pt-44 pb-12 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
          <span className="text-orange-500">TECH</span>{" "}
          <span className="text-white">SKILLS</span>
        </h2>
      </div>

      {/* Orbit Section */}
      <div className="relative h-[500px] w-full flex items-center justify-center">
        {/* Background stars */}
        <div className="absolute inset-0 -z-10">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`,
              }}
            ></div>
          ))}
        </div>

        {/* Central Star */}
        <img
          src="assets/star.png"
          alt="Central Star"
          className="absolute w-36 h-36 z-20 object-contain animate-pulse"
        />

        {/* Planets in Orbit */}
        {Object.entries(skillsData).map(([category, data]) => {
          const radiusX = 650; // Wider ellipse
          const radiusY = 150; // Shorter height
          const angle = ((data.angle + rotation) * Math.PI) / 180;

          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;

          return (
            <div
              key={category}
              className="absolute flex flex-col items-center transition-transform duration-300"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              <img
                src={`assets/${data.icon}`}
                alt={category}
                className="w-28 h-28 object-contain hover:scale-110 transition-transform duration-300"
                title={category}
              />
              <span className="mt-2 text-sm text-gray-300 bg-black/60 px-2 py-0.5 rounded-full border border-gray-700">
                {category}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;