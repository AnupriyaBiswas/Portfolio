import React, { useEffect, useState } from "react";

const researchItems = [
  {
    title: "Optimizing Neural Interfaces for Real-time Processing",
    summary:
      "A deep learning-based approach to improve latency and accuracy in neural interfaces for prosthetic control.",
    link: "https://example.com/research/neural-interfaces",
  },
  {
    title: "Human Gait Analysis using Multimodal Sensors",
    summary:
      "Research focusing on using EMG and IMU data fusion to differentiate gait patterns in Parkinson's disease.",
    link: "https://example.com/research/gait-analysis",
  },
];

const Research = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 10,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <>
      <section
        id="research"
        className="min-h-screen bg-black text-white relative overflow-hidden w-screen"
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden z-20">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `fall ${25 + Math.random() * 20}s linear infinite, twinkle ${6 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${star.animationDelay}s`,
              }}
            />
          ))}
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes fall {
            0% {
              transform: translateY(-100vh);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
          @keyframes twinkle {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.9;
            }
          }
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(249, 115, 22, 0.6);
            }
          }
        `}</style>

        {/* 🔬 Heading */}
        <div className="pt-36 pb-20 text-center z-10 relative">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold">
            <span className="text-orange-500">RESEARCH</span>{" "}
            <span className="text-white">WORK</span>
          </h2>
        </div>

        {/* 📚 Research Cards */}
        <div className="relative z-10 px-4 md:px-20 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {researchItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Card number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white group-hover:text-orange-100 transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                      >
                        View Research
                        <svg 
                          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                      
                      {/* Status badge */}
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-medium">Published</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-2 border-orange-500/20 rounded-full flex items-center justify-center group-hover:border-orange-500/40 transition-colors duration-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom decorative line */}
            <div className="mt-20 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Research;