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
      "Research focusing on using EMG and IMU data fusion to differentiate gait patterns in Parkinson's disease, providing insights for early diagnosis.",
    link: "https://example.com/research/gait-analysis",
    status: "Published",
  },
  {
    title: "Quantum Entanglement for Secure Communication", // Dummy data for the third card
    summary:
      "Exploring the practical applications of quantum entanglement to develop highly secure, unhackable communication channels based on quantum key distribution protocols.",
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
          @keyframes subtleGlowPulse {
            0%,
            100% {
              box-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
            }
            50% {
              box-shadow: 0 0 20px rgba(249, 115, 22, 0.7);
            }
          }
          @keyframes highlightStream {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              transform: translateX(0%);
              opacity: 0;
            }
          }
          @keyframes pulse-fast {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.4;
            }
          }
           @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
           }
        `}</style>

        {/* 🔬 Heading - Astro-Codex Console */}
        <div className="pt-20 pb-16 text-center z-10 relative px-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            <span className="text-orange-500">ASTRO-CODEX</span>{" "}
            <span className="text-white">INTERFACE</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mt-4 font-light max-w-2xl mx-auto">
            Accessing encrypted research chronicles from the farthest reaches of knowledge.
          </p>
        </div>

        {/* 📚 Research Data Streams */}
        <div className="relative z-10 px-4 md:px-20 pb-20 w-full max-w-6xl mx-auto">
          {researchItems.map((item, index) => (
            <div
              key={index}
              className="group relative my-8 p-6 md:p-8 rounded-lg overflow-hidden
                         bg-gradient-to-r from-gray-900/70 via-gray-900/60 to-transparent
                         border border-gray-800/50 hover:border-orange-600/70
                         transition-all duration-500 cursor-pointer
                         transform hover:-translate-y-1 hover:scale-[1.005]
                         shadow-lg hover:shadow-orange-500/15
                         animate-fade-in-up"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              {/* Animated highlight stream on hover */}
              <div className="absolute inset-y-0 left-0 w-1/4 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-[highlightStream_1.5s_ease-out_forwards_infinite_alternate]"></div>
              </div>

              {/* Data stream "circuitry" / outline */}
              <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none
                          group-hover:border-orange-500/50 transition-all duration-500"
                   style={{ animation: `subtleGlowPulse 2s infinite ease-in-out` }}>
              </div>

              {/* Data Index / Chrono-Log Number */}
              <div className="absolute top-1/2 left-4 md:left-6 transform -translate-y-1/2 text-orange-400 text-3xl md:text-5xl font-mono opacity-60
                          group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-10">
                <span className="block leading-none">{index < 9 ? `0${index + 1}` : index + 1}</span>
              </div>

              {/* Content */}
              <div className="relative z-10 pl-16 md:pl-24"> {/* Adjusted padding to make space for index */}
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-orange-100 transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 mb-4 text-base leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-800/50">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2 bg-orange-500 text-white font-semibold rounded-full text-sm
                               hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                  >
                    Access Data
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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

                  {/* Status badge */}
                  <div className="flex items-center space-x-2 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === "Published"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } animate-pulse-fast`}
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
            </div>
          ))}
        </div>

        {/* Cosmic Data Flow Separator */}
        <div className="mt-16 flex justify-center relative z-10">
          <div className="w-96 h-1.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full relative">
            <div className="absolute inset-0 bg-blue-400/30 blur-sm rounded-full animate-[highlightStream_3s_ease-out_infinite_alternate_reverse]"></div>
            <div className="absolute -left-2 top-0 w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast"></div>
            <div className="absolute -right-2 top-0 w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast delay-700"></div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-4 relative z-10">End of Transmissions</p>
      </section>
    </>
  );
};

export default Research;