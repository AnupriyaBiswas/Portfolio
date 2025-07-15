import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  "FRONTEND": {
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap", "SASS"],
    color: "from-blue-500 to-cyan-400",
    icon: "🌐",
    position: { x: 20, y: 15, z: 0.8 }
  },
  "BACKEND": {
    skills: ["Python", "Java", "Node.js", "REST APIs", "Flask", "C/C++"],
    color: "from-green-500 to-emerald-400", 
    icon: "⚡",
    position: { x: 80, y: 25, z: 0.6 }
  },
  "AI / ML": {
    skills: ["Machine Learning", "TensorFlow", "PyTorch", "Keras", "OpenCV", "NumPy", "Pandas", "Scikit-learn"],
    color: "from-purple-500 to-pink-400",
    icon: "🧠",
    position: { x: 70, y: 70, z: 0.9 }
  },
  "DATABASE": {
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
    color: "from-orange-500 to-red-400",
    icon: "🗄️",
    position: { x: 15, y: 75, z: 0.4 }
  },
  "TOOLS": {
    skills: ["Git", "GitHub", "VS Code", "Android Studio", "Jupyter Notebook", "WordPress"],
    color: "from-indigo-500 to-purple-400",
    icon: "🛠️",
    position: { x: 85, y: 45, z: 0.7 }
  },
  "SYSTEMS": {
    skills: ["Linux (Ubuntu)", "Windows", "Android", "Data Structures", "Algorithms", "OOP"],
    color: "from-teal-500 to-cyan-400",
    icon: "💻",
    position: { x: 45, y: 20, z: 0.5 }
  }
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [warpMode, setWarpMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const generateStarfield = () => {
    const stars = [];
    for (let i = 0; i < 300; i++) {
      const size = Math.random() * 4 + 1;
      const opacity = Math.random() * 0.8 + 0.2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const z = Math.random();
      const speed = (1 - z) * 20 + 5;
      
      stars.push(
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size * (1 - z * 0.5)}px`,
            height: `${size * (1 - z * 0.5)}px`,
            left: `${x}%`,
            top: `${y}%`,
            opacity: opacity * (1 - z * 0.3),
            animation: `starMove ${speed}s linear infinite`,
            animationDelay: `${Math.random() * speed}s`,
            transform: `translateZ(${z * 100}px)`
          }}
        />
      );
    }
    return stars;
  };

  const handleCategoryClick = (category) => {
    setWarpMode(true);
    setSelectedCategory(category);
    
    setTimeout(() => {
      setWarpMode(false);
    }, 1500);
  };

  const handleBackToStarfield = () => {
    setWarpMode(true);
    
    setTimeout(() => {
      setSelectedCategory(null);
      setWarpMode(false);
    }, 800);
  };

  return (
    <>
      <style jsx>{`
        @keyframes starMove {
          0% {
            transform: translateZ(100px) translateY(0);
          }
          100% {
            transform: translateZ(-100px) translateY(-20px);
          }
        }
        
        @keyframes warpSpeed {
          0% {
            transform: scaleX(1) scaleY(1);
            opacity: 1;
          }
          50% {
            transform: scaleX(20) scaleY(0.1);
            opacity: 0.5;
          }
          100% {
            transform: scaleX(50) scaleY(0.05);
            opacity: 0;
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 165, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 165, 0, 0.8);
          }
        }
        
        @keyframes floatStar {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }
        
        @keyframes slideIn {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      
      <section
        ref={sectionRef}
        id="skills"
        className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Animated Starfield Background */}
        <div className={`absolute inset-0 transition-all duration-1000 ${warpMode ? 'animate-pulse' : ''}`}>
          {generateStarfield()}
        </div>

        {/* Warp Speed Overlay */}
        {warpMode && (
          <div className="absolute inset-0 z-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `warpSpeed 1s ease-out ${Math.random() * 0.5}s forwards`
                }}
              />
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl w-full h-full">
          {/* Title */}
          <h2 
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-16 text-center transition-all duration-1000 ease-out ${
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

          {!selectedCategory ? (
            /* Starfield Navigation View */
            <div className="relative w-full h-96 md:h-[500px]">
              <div className="absolute inset-0">
                {Object.entries(skillsData).map(([category, data], index) => {
                  const distance = data.position.z;
                  const scale = 0.5 + distance * 0.5;
                  const brightness = 0.6 + distance * 0.4;
                  
                  // Parallax effect based on mouse position
                  const parallaxX = (mousePosition.x - 50) * (1 - distance) * 0.1;
                  const parallaxY = (mousePosition.y - 50) * (1 - distance) * 0.1;
                  
                  return (
                    <div
                      key={category}
                      className={`absolute cursor-pointer transition-all duration-1000 ease-out group ${
                        isVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{
                        left: `${data.position.x + parallaxX}%`,
                        top: `${data.position.y + parallaxY}%`,
                        transform: `translate(-50%, -50%) scale(${scale})`,
                        transitionDelay: isVisible ? `${0.6 + index * 0.2}s` : '0s',
                        filter: `brightness(${brightness})`
                      }}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {/* Star Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${data.color} rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                           style={{
                             width: '120px',
                             height: '120px',
                             left: '-10px',
                             top: '-10px',
                             animation: distance > 0.7 ? 'pulseGlow 2s ease-in-out infinite' : 'none'
                           }}></div>
                      
                      {/* Main Star */}
                      <div className={`relative w-24 h-24 bg-gradient-to-r ${data.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                           style={{
                             animation: `floatStar ${3 + index}s ease-in-out infinite`,
                             animationDelay: `${index * 0.5}s`
                           }}>
                        <div className="text-3xl">{data.icon}</div>
                      </div>
                      
                      {/* Category Label */}
                      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-sm font-bold bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700">
                          {category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Navigation Instructions */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-gray-400 text-sm mb-2">Click on a star to explore skills</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          ) : (
            /* Selected Category Detailed View */
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleBackToStarfield}
                  className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 transition-colors duration-300"
                >
                  <span>←</span>
                  <span>Back to Starfield</span>
                </button>
                
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{skillsData[selectedCategory].icon}</div>
                  <h3 className="text-4xl font-bold">{selectedCategory}</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skillsData[selectedCategory].skills.map((skill, index) => (
                  <div
                    key={skill}
                    className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-orange-500/50 transition-all duration-500 hover:scale-105`}
                    style={{
                      animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Skills;