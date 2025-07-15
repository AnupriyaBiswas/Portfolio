import React, { useEffect, useRef, useState } from "react";

const skillsData = [
  {
    name: "FRONTEND",
    icon: "skill1.png",
    color: "from-blue-500 to-cyan-400",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap", "SASS"],
    angle: 0
  },
  {
    name: "BACKEND",
    icon: "skill2.png",
    color: "from-green-500 to-emerald-400",
    skills: ["Python", "Java", "Node.js", "REST APIs", "Flask", "C/C++"],
    angle: 60
  },
  {
    name: "AI / ML",
    icon: "skill3.png",
    color: "from-purple-500 to-pink-400",
    skills: ["Machine Learning", "TensorFlow", "PyTorch", "Keras", "OpenCV", "NumPy", "Pandas", "Scikit-learn"],
    angle: 120
  },
  {
    name: "DATABASE",
    icon: "skill4.png",
    color: "from-orange-500 to-red-400",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
    angle: 180
  },
  {
    name: "TOOLS",
    icon: "skill5.png",
    color: "from-indigo-500 to-purple-400",
    skills: ["Git", "GitHub", "VS Code", "Android Studio", "Jupyter Notebook", "WordPress"],
    angle: 240
  },
  {
    name: "SYSTEMS",
    icon: "skill6.png",
    color: "from-teal-500 to-cyan-400",
    skills: ["Linux (Ubuntu)", "Windows", "Android", "Data Structures", "Algorithms", "OOP"],
    angle: 300
  }
];

const Skills = () => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.0003; // slow rotation
      const width = window.innerWidth;
      const height = 500; // height of orbit zone
      const centerX = width / 2;
      const centerY = height / 2;

      const a = width / 3; // horizontal radius
      const b = 150;       // vertical radius

      const newPositions = skillsData.map(({ angle }, i) => {
        const rad = (angle * Math.PI) / 180 + time;
        return {
          x: centerX + a * Math.cos(rad),
          y: centerY + b * Math.sin(rad)
        };
      });
      setPositions(newPositions);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full h-[600px] bg-black overflow-hidden text-white"
    >
      <h2 className="text-center text-5xl md:text-7xl font-bold pt-10 pb-20">
        <span className="text-orange-500">TECH</span> <span>SKILLS</span>
      </h2>

      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-50"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: Math.random() * 600,
              left: Math.random() * window.innerWidth
            }}
          />
        ))}
      </div>

      {positions.map((pos, i) => (
        <div
          key={skillsData[i].name}
          className="absolute transition-transform duration-100"
          style={{
            left: pos.x - 40,
            top: pos.y - 40,
            zIndex: Math.round(10 + pos.y),
            transform: `translate(-50%, -50%)`
          }}
        >
          <img
            src={`assets/${skillsData[i].icon}`}
            alt={skillsData[i].name}
            className="w-20 h-20 object-contain hover:scale-110 transition-transform duration-300"
            style={{ filter: "brightness(1.2) contrast(1.1)", mixBlendMode: "screen" }}
          />
        </div>
      ))}
    </section>
  );
};

export default Skills;
