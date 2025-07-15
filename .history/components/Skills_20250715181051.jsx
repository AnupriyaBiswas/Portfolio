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
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [zoomMode, setZoomMode] = useState(false);
  const [rotation, setRotation] = useState(0);
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

  // Continuous rotation of skill planets
  useEffect(() => {
    if (!selectedCategory) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.2);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [selectedCategory]);

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.8 + 0.2;
      const duration = Math.random() * 10 + 15;
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

  const handleCategoryClick = (category) => {
    setZoomMode(true);

    setTimeout(() => {
      setSelectedCategory(category);
      setZoomMode(false);
    }, 1000);
  };

  const handleBackToSystem = () => {
    setZoomMode(true);

    setTimeout(() => {
      setSelectedCategory(null);
      setZoomMode(false);
    }, 800);
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
        
        @keyframes zoomIn {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(20);
            opacity: 0;
          }
        }
        
        @keyframes cardSlideIn {
          0% {
            transform: translateY(100px) rotateX(20deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes skillItemFade {
          0% {
            transform: translateX(-30px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
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
      `}</style>

      <section
        ref={sectionRef}
        id="skills"
        className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
      >
        {/* Slow Moving Stars Background */}
        <div className="absolute inset-0 pointer-events-none">
          {generateStars()}
        </div>

        {/* Zoom Effect Overlay */}
        {zoomMode && (
          <div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/20 to-black animate-pulse"></div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl w-full">
          {/* Title */}
          <h2
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-16 text-center transition-all duration-1000 ease-out ${isVisible
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
            /* Angled Solar System View */
            <div className="relative w-full h-96 md:h-[600px] flex items-center justify-center perspective-1000">

              {/* Solar System Container with 3D Transform */}
              <div
                className="relative w-full h-full"
                style={{
                  transform: 'rotateX(15deg) rotateY(-10deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Central Sun */}
                <div className="absolute z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <img
                      src="assets/star.png"
                      alt="Central Star"
                      className="w-32 h-32 md:w-40 md:h-40 object-cover"
                      style={{
                        animation: 'pulseGlow 3s ease-in-out infinite',
                        filter: 'brightness(1.2) contrast(1.1)'
                      }}
                    />
                  </div>
                </div>

                {/* Orbital Rings - Now elliptical due to perspective */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="border border-gray-700/20 rounded-full"
                    style={{
                      width: '320px',
                      height: '320px',
                      transform: 'rotateX(75deg)'
                    }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="border border-gray-600/10 rounded-full"
                    style={{
                      width: '450px',
                      height: '450px',
                      transform: 'rotateX(75deg)'
                    }}
                  ></div>
                </div>

                {/* Orbiting Skills */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {Object.entries(skillsData).map(([category, data], index) => {
                    const orbitRadius = 280 + (index % 2) * 60;
                    const currentAngle = (data.angle + rotation) * (Math.PI / 180);

                    // Calculate position with perspective effect
                    const x = Math.cos(currentAngle) * orbitRadius;
                    const z = Math.sin(currentAngle) * orbitRadius;
                    // Simulate perspective by adjusting y position based on z
                    const y = z * 0.3; // Flatten the orbit to create perspective

                    // Calculate scale based on z position (closer objects appear larger)
                    const scale = 1 + (z * 0.0005);

                    return (
                      <div
                        key={category}
                        className={`absolute cursor-pointer transition-all duration-1000 ease-out group ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                          }`}
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                          transitionDelay: isVisible ? `${0.6 + index * 0.2}s` : '0s',
                          zIndex: Math.round(10 + z * 0.01) // Objects closer to viewer have higher z-index
                        }}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {/* Planet - Removed circles and glow */}
                        <img
                          src={`assets/${data.icon}`}
                          alt={category}
                          className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-full hover:scale-110 transition-transform duration-300"
                          style={{
                            filter: 'brightness(1.15) contrast(1.05)',
                            mixBlendMode: 'screen',
                          }}
                        />


                        {/* Category Label */}
                        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="text-xs font-bold bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-700 whitespace-nowrap">
                            {category}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Instructions */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-gray-400 text-sm mb-2">Click on any planet to explore skills</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          ) : (
            /* Zoomed Skill Card View */
            <div className="relative perspective-1000">
              {/* Back Button */}
              <div className="absolute top-0 left-0 z-20">
                <button
                  onClick={handleBackToSystem}
                  className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 transition-colors duration-300 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700"
                >
                  <span>←</span>
                  <span>Back to System</span>
                </button>
              </div>

              {/* Skill Card */}
              <div
                className="relative max-w-4xl mx-auto mt-16"
                style={{
                  animation: 'cardSlideIn 1s ease-out'
                }}
              >
                {/* Card Background with Gradient */}
                <div className={`relative bg-gradient-to-br ${skillsData[selectedCategory].color} p-1 rounded-3xl`}>
                  <div className="bg-gray-900/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">

                    {/* Card Header */}
                    <div className="flex items-center justify-center mb-12">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 overflow-hidden">
                          <img
                            src={`assets/${skillsData[selectedCategory].icon}`}
                            alt={selectedCategory}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedCategory}</h3>
                          <div className="text-gray-400">Core Technologies & Tools</div>
                        </div>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {skillsData[selectedCategory].skills.map((skill, index) => (
                        <div
                          key={skill}
                          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:bg-gray-800/70"
                          style={{
                            animation: `skillItemFade 0.6s ease-out ${index * 0.1}s both`
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                            <span className="text-white font-medium">{skill}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div className="mt-12 text-center">
                      <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <span>Proficient in {skillsData[selectedCategory].skills.length} technologies</span>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Skills;