import React, { useEffect, useRef, useState } from "react";

const skills = {
  "Programming Languages": [
    "Python", "Java", "C/C++", "HTML/CSS", "SQL"
  ],
  "Developer Tools": [
    "Git", "GitHub", "VS Code", "Android Studio", "Jupyter Notebook", "WordPress"
  ],
  "Libraries & Frameworks": [
    "TensorFlow", "PyTorch", "Keras", "NumPy", "Pandas", "Scikit-learn", "OpenCV", "Matplotlib", "React", "Bootstrap", "Node.js"
  ],
  "Computer Science": [
    "Machine Learning", "Data Structures", "Algorithms", "Object-Oriented Programming (OOP)", "Data Structures and Algorithms"
  ],
  "Database & Backend Technologies": [
    "MySQL", "MongoDB", "REST APIs"
  ],
  "Operating Systems": [
    "Linux (Ubuntu)", "Windows", "Android"
  ]
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

          {/* Skills Categories */}
          <div className="space-y-12">
            {Object.entries(skills).map(([category, skillsList], categoryIndex) => (
              <div
                key={category}
                className={`transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${0.4 + categoryIndex * 0.2}s` : '0s'
                }}
              >
                {/* Category Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-orange-500 uppercase tracking-wide">
                  {category}
                </h3>
                
                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {skillsList.map((skill, index) => (
                    <div
                      key={index}
                      className="group relative px-4 py-3 bg-gray-900 hover:bg-gray-800 transition-all duration-300 rounded-lg shadow-lg border border-gray-700 hover:border-orange-500 cursor-pointer transform hover:scale-105"
                    >
                      <div className="text-center">
                        <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-orange-400 transition-colors duration-300">
                          {skill}
                        </span>
                      </div>
                      
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-lg bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Animated decorative elements */}
          <div className="mt-20 flex items-center">
            <div 
              className={`w-16 h-0.5 bg-orange-500 mr-4 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '1.8s' : '0s'
              }}
            ></div>
            <div 
              className={`w-8 h-0.5 bg-white mr-4 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '2.0s' : '0s'
              }}
            ></div>
            <div 
              className={`w-4 h-0.5 bg-orange-500/60 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '2.2s' : '0s'
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;