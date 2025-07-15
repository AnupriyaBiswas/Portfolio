import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  FRONTEND: {
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap", "SASS"],
    color: "from-blue-500 to-cyan-400",
    icon: "skill1.png",
    angle: 0,
  },
  BACKEND: {
    skills: ["Python", "Java", "Node.js", "REST APIs", "Flask", "C/C++"],
    color: "from-green-500 to-emerald-400",
    icon: "skill2.png",
    angle: 60,
  },
  "AI / ML": {
    skills: ["Machine Learning", "TensorFlow", "PyTorch", "Keras", "OpenCV", "NumPy", "Pandas", "Scikit-learn"],
    color: "from-purple-500 to-pink-400",
    icon: "skill3.png",
    angle: 120,
  },
  DATABASE: {
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
    color: "from-orange-500 to-red-400",
    icon: "skill4.png",
    angle: 180,
  },
  TOOLS: {
    skills: ["Git", "GitHub", "VS Code", "Android Studio", "Jupyter Notebook", "WordPress"],
    color: "from-indigo-500 to-purple-400",
    icon: "skill5.png",
    angle: 240,
  },
  SYSTEMS: {
    skills: ["Linux (Ubuntu)", "Windows", "Android", "Data Structures", "Algorithms", "OOP"],
    color: "from-teal-500 to-cyan-400",
    icon: "skill6.png",
    angle: 300,
  },
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
      className="min-h-screen bg-black text-white overflow-x-hidden w-screen"
    >
      {/* Heading */}
      <div className="pt-44 pb-12 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
          <span className="text-orange-500">TECH</span>{" "}
          <span className="text-white">SKILLS</span>
        </h2>
      </div>

      {/* Orbit Container */}
      <div className="relative h-[500px] w-[100vw] max-w-none overflow-hidden mx-auto flex items-center justify-center">
        {/* Stars */}
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
          className="absolute w-40 h-40 z-20 object-contain"
        />

        {/* Orbit SVG */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 300"
            className="w-full h-full max-w-[1000px] opacity-30"
            preserveAspectRatio="xMidYMid meet"
          >
            <ellipse
              cx="500"
              cy="150"
              rx="480"
              ry="120"
              fill="none"
              stroke="white"
              strokeDasharray="4 4"
              strokeOpacity="0.8"
            />
          </svg>
        </div>

        {/* Planets */}
        {Object.entries(skillsData).map(([category, data]) => {
          const radiusX = 480;
          const radiusY = 120;
          const angle = ((data.angle + rotation) * Math.PI) / 180;

          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;

          return (
            <div
              key={category}
              className="absolute flex flex-col items-center transition-transform duration-300"
              style={{
                transform: `translate(${x}px, ${y}px)`,
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
