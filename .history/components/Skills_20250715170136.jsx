import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  FRONTEND: {
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap", "SASS"],
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

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.8 + 0.2;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * duration;
      const left = Math.random() * 100;
      stars.push(
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${Math.random() * 100}%`,
            opacity,
            animation: `starFall ${duration}s linear ${delay}s infinite, twinkle 3s ease-in-out infinite`,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <style jsx>{`
        @keyframes starFall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        className="relative min-h-screen px-4 md:px-10 py-20 bg-black text-white overflow-hidden flex flex-col items-center"
      >
        {/* Starry Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {generateStars()}
        </div>

        {/* Title */}
        <h2
          className={`text-5xl md:text-7xl font-bold mb-24 text-center z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-orange-500">TECH</span> <span>SKILLS</span>
        </h2>

        {/* Floating Orbital Categories */}
        <div className="relative flex flex-wrap justify-center gap-12 z-10 max-w-6xl">
          {Object.entries(skillsData).map(([category, data], i) => (
            <div
              key={i}
              className="relative w-[240px] h-[240px] rounded-full border border-gray-700 hover:border-orange-500 transition-all"
            >
              {/* Central Planet */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${data.color} text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg`}
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                {data.icon}
              </div>

              {/* Orbiting Skills */}
              {data.skills.map((skill, idx) => {
                const angle = (360 / data.skills.length) * idx;
                const radius = 90;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={skill}
                    className="absolute text-sm text-gray-300 hover:text-orange-400 transition-all duration-300"
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {skill}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Skills;
