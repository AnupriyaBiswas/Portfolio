import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  "FRONTEND": {
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap", "SASS"],
    color: "from-blue-500 to-cyan-400",
    icon: "🌐"
  },
  "BACKEND": {
    skills: ["Python", "Java", "Node.js", "REST APIs", "Flask", "C/C++"],
    color: "from-green-500 to-emerald-400", 
    icon: "⚡"
  },
  "AI / ML": {
    skills: ["Machine Learning", "TensorFlow", "PyTorch", "Keras", "OpenCV", "NumPy", "Pandas", "Scikit-learn"],
    color: "from-purple-500 to-pink-400",
    icon: "🧠"
  },
  "DATABASE": {
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
    color: "from-orange-500 to-red-400",
    icon: "🗄️"
  },
  "TOOLS": {
    skills: ["Git", "GitHub", "VS Code", "Android Studio", "Jupyter Notebook", "WordPress"],
    color: "from-indigo-500 to-purple-400",
    icon: "🛠️"
  },
  "SYSTEMS": {
    skills: ["Linux (Ubuntu)", "Windows", "Android", "Data Structures", "Algorithms", "OOP"],
    color: "from-teal-500 to-cyan-400",
    icon: "💻"
  }
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Generate stars for background animation
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 3 + 1; // 1-4px
      const opacity = Math.random() * 0.8 + 0.2; // 0.2-1.0
      const duration = Math.random() * 10 + 15; // 15-25 seconds
      const delay = Math.random() * duration;
      const left = Math.random() * 100;
      
      stars.push(
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            opacity: opacity,
            animation: `starFall ${duration}s linear ${delay}s infinite, twinkle 3s ease-in-out infinite`,
            animationDelay: `${delay}s, ${Math.random() * 3}s`
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
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <section
        ref={sectionRef}
        id="skills"
        className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 pointer-events-none">
          {generateStars()}
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl w-full">
          {/* Title */}
          <h2 
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-16 text-left transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? '0.2s' : '0s'
            }}
          >
            <span className="text-orange-500">TECH</span>{" "}
            <span className="text-white">SKILLS</span>
          </h2>

          {/* Cosmic Skills Universe */}
          <div className="relative">
            {/* Central Hub */}
            <div className="flex justify-center mb-20">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-4xl">🚀</div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-lg animate-pulse"></div>
                <div className="absolute -inset-8 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>

            {/* Skill Constellations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {Object.entries(skillsData).map(([category, data], categoryIndex) => (
                <div
                  key={category}
                  className={`relative group transition-all duration-1000 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${0.6 + categoryIndex * 0.15}s` : '0s'
                  }}
                >
                  {/* Constellation Container */}
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full hover:border-orange-500/50 transition-all duration-500 group-hover:scale-105">
                    {/* Constellation Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{data.icon}</div>
                        <h3 className="text-xl font-bold text-white tracking-wide">{category}</h3>
                      </div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>

                    {/* Skills as Stars */}
                    <div className="space-y-3">
                      {data.skills.map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className="relative flex items-center group/skill"
                          style={{
                            animationDelay: `${categoryIndex * 0.15 + skillIndex * 0.05}s`
                          }}
                        >
                          {/* Connecting Line */}
                          <div className="w-4 h-px bg-gradient-to-r from-gray-600 to-transparent mr-3 opacity-60"></div>
                          
                          {/* Skill Star */}
                          <div className="flex items-center space-x-2 flex-1">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse group-hover/skill:bg-orange-300"></div>
                            <span className="text-sm text-gray-300 group-hover/skill:text-orange-300 transition-colors duration-300">
                              {skill}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Constellation Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                    
                    {/* Outer Glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-lg transition-opacity duration-500`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Orbiting Skills */}
            <div className="flex justify-center">
              <div className="relative w-96 h-96">
                {/* Orbital Rings */}
                <div className="absolute inset-8 border border-gray-700/30 rounded-full animate-spin" style={{animationDuration: '60s'}}></div>
                <div className="absolute inset-16 border border-gray-600/20 rounded-full animate-spin" style={{animationDuration: '40s', animationDirection: 'reverse'}}></div>
                <div className="absolute inset-24 border border-gray-500/10 rounded-full animate-spin" style={{animationDuration: '80s'}}></div>
                
                {/* Orbiting Tech Icons */}
                <div className="absolute inset-8 animate-spin" style={{animationDuration: '60s'}}>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated decorative elements */}
          <div className="mt-16 flex items-center justify-center">
            <div 
              className={`w-16 h-0.5 bg-orange-500 mr-4 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '2.5s' : '0s'
              }}
            ></div>
            <div 
              className={`w-8 h-0.5 bg-white mr-4 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '2.7s' : '0s'
              }}
            ></div>
            <div 
              className={`w-4 h-0.5 bg-orange-500/60 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '2.9s' : '0s'
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;