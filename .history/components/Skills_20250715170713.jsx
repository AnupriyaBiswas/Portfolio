import React from "react";

// Skill Data
const skillsData = {
  FRONTEND: {
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind", "Bootstrap", "SASS"],
    color: "from-blue-500 to-cyan-400",
    icon: "🪐"
  },
  BACKEND: {
    skills: ["Python", "Java", "Node.js", "REST APIs", "Flask", "C/C++"],
    color: "from-green-500 to-emerald-400",
    icon: "🌌"
  },
  "AI / ML": {
    skills: ["Machine Learning", "TensorFlow", "PyTorch", "Keras", "OpenCV", "NumPy", "Pandas", "Scikit-learn"],
    color: "from-purple-500 to-pink-400",
    icon: "🧠"
  },
  DATABASE: {
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
    color: "from-orange-500 to-red-400",
    icon: "🛰️"
  },
  TOOLS: {
    skills: ["Git", "GitHub", "VS Code", "Android Studio", "Jupyter Notebook", "WordPress"],
    color: "from-indigo-500 to-purple-400",
    icon: "🚀"
  },
  SYSTEMS: {
    skills: ["Linux (Ubuntu)", "Windows", "Android", "Data Structures", "Algorithms", "OOP"],
    color: "from-teal-500 to-cyan-400",
    icon: "🛸"
  }
};

// Single Orbital Planet Component
const SkillPlanet = ({ title, icon, skills, color }) => {
  const radius = 100;
  return (
    <div className="relative w-[280px] h-[280px] flex items-center justify-center text-white">
      {/* Orbit Line */}
      <div className="absolute w-full h-full rounded-full border border-gray-700/40 animate-spin-slow" />

      {/* Central Planet */}
      <div
        className={`z-10 w-20 h-20 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br ${color} shadow-lg`}
        style={{ animation: "float 6s ease-in-out infinite" }}
      >
        {icon}
      </div>

      {/* Orbiting Skills */}
      {skills.map((skill, index) => {
        const angle = (360 / skills.length) * index;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <div
            key={skill}
            className="absolute text-xs px-2 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm hover:scale-110 transition-all"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {skill}
          </div>
        );
      })}
    </div>
  );
};

// Skills Section
const Skills = () => {
  return (
    <>
      {/* Keyframes inlined to avoid touching global CSS */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <section
        id="skills"
        className="min-h-screen bg-black text-white px-4 py-20 flex flex-col items-center"
      >
        <h2 className="text-5xl font-bold mb-20 text-center">
          <span className="text-orange-500">TECH</span> SKILLS
        </h2>

        {/* Planet Grid */}
        <div className="flex flex-wrap justify-center gap-14 max-w-7xl mx-auto">
          {Object.entries(skillsData).map(([category, data]) => (
            <SkillPlanet
              key={category}
              title={category}
              icon={data.icon}
              skills={data.skills}
              color={data.color}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Skills;
