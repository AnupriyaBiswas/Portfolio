import React, { useEffect, useState } from "react";

const researchItems = [
  {
    title: "Optimizing Neural Interfaces for Real-time Processing",
    summary:
      "A deep learning-based approach to improve latency and accuracy in neural interfaces for prosthetic control.",
    link: "https://example.com/research/neural-interfaces",
    status: "Published",
  },
  {
    title: "Human Gait Analysis using Multimodal Sensors",
    summary:
      "Rch focusing on using EMG and IMU data fusion to differentiate gait patterns in Parkinson's disease.",
    link: "https://example.com/research/gait-analysis",
    status: "Published",
  },
  {
    title: "Quantum Entanglement for Secure Communication", // Dummy data for the third card
    summary:
      "Exploring the practical applications of quantum entanglement to develop highly secure, unhackable communication channels.",
    link: "https://example.com/research/quantum-comm",
    status: "In Progress", // Example for a different status
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
        className="min-h-screen bg-black text-white relative overflow-hidden w-screen flex flex-col justify-center items-center py-20"
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
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
                animation: `fall ${
                  25 + Math.random() * 20
                }s linear infinite, twinkle ${
                  6 + Math.random() * 8
                }s ease-in-out infinite`,
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
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.9;
            }
          }
          @keyframes glowPulse {
            0%,
            100% {
              box-shadow: 0 0 15px rgba(249, 115, 22, 0.4),
                0 0 30px rgba(249, 115, 22, 0.2);
            }
            50% {
              box-shadow: 0 0 25px rgba(249, 115, 22, 0.6),
                0 0 40px rgba(249, 115, 22, 0.3);
            }
          }
          @keyframes subtleCircuits {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 100% 100%;
            }
          }
          @keyframes cardFloat {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
        `}</style>

        {/* 🔬 Heading */}
        <div className="pt-20 pb-16 text-center z-10 relative">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold">
            <span className="text-orange-500">ASTRO-CODEX</span>{" "}
            <span className="text-white">CHRONICLES</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mt-4">
            Unearthing breakthroughs from the cosmic archives of innovation.
          </p>
        </div>

        {/* 📚 Research Cards */}
        <div className="relative z-10 px-4 md:px-20 pb-20 w-full max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 justify-center items-center">
            {researchItems.map((item, index) => (
              <div
                key={index}
                className="group relative
                           bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90
                           backdrop-blur-sm p-8 rounded-2xl
                           border border-gray-700/50
                           hover:border-orange-500/80
                           transition-all duration-500
                           hover:scale-[1.03]
                           hover:shadow-2xl hover:shadow-orange-500/20
                           overflow-hidden
                           aspect-square flex flex-col justify-between" // Added aspect-square for uniform card size
              >
                {/* Subtle circuit pattern background on card */}
                <div
                  className="absolute inset-0 z-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                    animation: `subtleCircuits 60s linear infinite`,
                  }}
                ></div>

                {/* Pulsing glow around the card on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ animation: `glowPulse 2s infinite ease-in-out` }}
                  ></div>
                </div>

                {/* Card number as an ancient cosmic rune/symbol */}
                <div className="absolute -top-4 -left-4 w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg
                            transform group-hover:scale-110 transition-transform duration-300 z-20
                            before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-2 before:border-orange-400 before:opacity-0 before:animate-ping-slow group-hover:before:opacity-100">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow flex flex-col justify-between">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-orange-100 transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mb-6 text-base leading-relaxed flex-grow">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                    >
                      Access Data
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>

                    {/* Status badge - styled as a glowing data point */}
                    <div className="flex items-center space-x-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.status === "Published"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } animate-pulse`}
                      ></div>
                      <span
                        className={`${
                          item.status === "Published"
                            ? "text-green-400"
                            : "text-yellow-400"
                        } font-medium`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative circuit lines / energy flows */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-orange-700/50 animate-pulse-slow"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-orange-700/50 animate-pulse-slow delay-500"></div>
                  <div className="absolute top-1/2 left-0 w-full h-px bg-orange-500/20 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute left-1/2 top-0 h-full w-px bg-orange-500/20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom decorative line - more pronounced */}
          <div className="mt-20 flex justify-center relative z-10">
            <div className="w-64 h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full relative">
              {/* Subtle energy nodes on the line */}
              <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full animate-ping-slow"></div>
              <div className="absolute -right-2 top-0 w-4 h-4 bg-orange-500 rounded-full animate-ping-slow delay-1000"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Research;