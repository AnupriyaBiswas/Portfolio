import React, { useEffect, useState, useRef } from "react";

const researchItems = [
  {
    title: "Optimizing Neural Interfaces",
    summary: "Deep learning for improved latency & accuracy in prosthetic control.",
    link: "https://example.com/research/neural-interfaces",
    github: "https://github.com/your-username/neural-interfaces", // Dummy GitHub URL
    status: "Published",
  },
  {
    title: "Human Gait Analysis",
    summary: "EMG/IMU data fusion for Parkinson's disease gait pattern differentiation.",
    link: "https://example.com/research/gait-analysis",
    github: "https://github.com/your-username/gait-analysis", // Dummy GitHub URL
    status: "Published",
  },
  {
    title: "Quantum Secure Communication",
    summary: "Exploring quantum entanglement for unhackable communication channels.",
    link: "https://example.com/research/quantum-comm",
    github: "https://github.com/your-username/quantum-comm", // Dummy GitHub URL
    status: "In Progress",
  },
];

const Research = () => {
  const [stars, setStars] = useState([]);
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0); // Which card is highlighted (0, 1, 2)
  const [isHovering, setIsHovering] = useState(false); // Flag if user is hovering over any card
  const spotlightIntervalRef = useRef(null); // Ref to hold the interval ID

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

    // Start card highlight oscillation
    startCardHighlightOscillation();

    // Cleanup interval on component unmount
    return () => clearInterval(spotlightIntervalRef.current);
  }, []);

  const startCardHighlightOscillation = () => {
    // Clear any existing interval first
    if (spotlightIntervalRef.current) {
      clearInterval(spotlightIntervalRef.current);
    }

    spotlightIntervalRef.current = setInterval(() => {
      if (!isHovering) { // Only oscillate if not hovering
        setCurrentSpotlightIndex(prevIndex =>
          (prevIndex + 1) % researchItems.length
        );
      }
    }, 4000); // Change highlighted card every 4 seconds
  };

  const handleMouseEnter = (index) => {
    // Only apply hover effects on larger screens (md and above)
    if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint is typically 768px
      setIsHovering(true);
      setCurrentSpotlightIndex(index); // Fix highlight on hovered card
      clearInterval(spotlightIntervalRef.current); // Stop oscillation
    }
  };

  const handleMouseLeave = () => {
    // Only apply hover effects on larger screens (md and above)
    if (window.innerWidth >= 768) {
      setIsHovering(false);
      startCardHighlightOscillation(); // Resume oscillation
    }
  };

  return (
    <>
      <section
        id="research"
        className="min-h-screen bg-black text-white relative overflow-hidden w-screen flex flex-col justify-center items-center py-10 sm:py-20"
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
                animation: `fall ${25 + Math.random() * 20
                  }s linear infinite, twinkle ${6 + Math.random() * 8
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
              box-shadow: 0 0 20px rgba(249, 115, 22, 0.8); /* Stronger glow intensity */
            }
            50% {
              box-shadow: 0 0 40px rgba(249, 115, 22, 1); /* Even stronger, full opacity glow */
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

        {/* 🪐 Heading */}
        <div className="pt-0 pb-0 text-center z-10 relative px-4 w-full">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-0">
            <span className="text-orange-500">RESEARCH</span>{" "}
            <span className="text-white">WORK</span>
          </h2>
        </div>

        {/* Main Content Area: Spotlight on Left, Research Streams on Right */}
        <div className="relative z-10 w-full flex items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-80px)] py-4">
          {/* Left Side: Spotlight Image Container - Fixed and Hidden on Mobile */}
          <div className="hidden md:flex w-[30%] h-full items-center justify-center relative overflow-hidden">
            <img
              src="/assets/spotlight.jpg"
              alt="Astronaut holding the Moon as a focus element"
              className="h-auto w-full max-w-[90%] object-contain"
            />
          </div>

          {/* Right Side: Research Data Streams */}
          <div className="w-full md:w-[70%] px-4 flex flex-col justify-between h-full max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-150px)]">
            {researchItems.map((item, index) => (
              <div
                key={index}
                className={`group relative my-2 p-4 md:p-5 rounded-lg overflow-hidden
                                     bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-transparent
                                     border border-gray-700/70
                                     transition-all duration-500 cursor-pointer
                                     shadow-lg hover:shadow-xl hover:shadow-orange-500/40

                                     // Default (mobile) state: always visible, no hover effects
                                     opacity-100 scale-100
                                     
                                     // md and larger: apply initial subdued state and hover effects
                                     md:opacity-80 md:scale-95
                                     md:hover:border-orange-600/80
                                     md:hover:-translate-y-0.5
                                     md:hover:scale-100
                                     md:hover:shadow-orange-500/25

                                     // Highlighted state (overrides default/hover for md+ screens)
                                     ${currentSpotlightIndex === index ? 'md:opacity-100 md:scale-100' : ''}
                                     transition-opacity transition-transform duration-500 ease-in-out`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Animated highlight stream on hover (only md and larger) */}
                <div className="absolute inset-y-0 left-0 w-1/4 bg-orange-500/15 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-[highlightStream_1.5s_ease-out_forwards_infinite_alternate]"></div>
                </div>

                {/* Data stream "circuitry" / outline (only md and larger) */}
                <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none
                                     md:group-hover:border-orange-500/80 transition-all duration-500"
                  style={currentSpotlightIndex === index ? { animation: `subtleGlowPulse 2s infinite ease-in-out` } : {}}>
                </div>

                {/* Data Index / Chrono-Log Number - BIGGER & FILLS HEIGHT */}
                <div className="absolute top-0 bottom-0 left-0 w-16 md:w-20 flex items-center text-orange-200 text-6xl md:text-7xl font-bold opacity-50 pointer-events-none">
                    <span className="leading-none pl-2">{index < 9 ? `0${index + 1}` : index + 1}</span> {/* Added pl-2 for left padding */}
                </div>

                {/* Content */}
                <div className="relative z-10 pl-16 md:pl-20"> {/* Adjusted padding to make room for the larger number */}
                  <div className="flex justify-between items-center mb-1"> {/* Flex container for title and GitHub icon */}
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-orange-50 transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                    {/* GitHub Button on the extreme right, same line as title */}
                    {item.github && (
                      <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 ml-4 p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/70 text-gray-200 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.47.087.683-.23.683-.505 0-.249-.015-1.097-.015-1.994-2.791.603-3.375-1.34-3.375-1.34-.454-1.151-1.11-1.458-1.11-1.458-.908-.62.069-.608.069-.608 1.006.07 1.533 1.036 1.533 1.036.892 1.529 2.343 1.085 2.913.829.091-.645.35-1.085.637-1.334-2.22-.25-4.555-1.11-4.555-4.943 0-1.09.387-1.983 1.023-2.682-.104-.253-.444-1.272.098-2.65 0 0 .835-.269 2.738 1.026A9.155 9.155 0 0112 5.042c.86.002 1.718.115 2.534.331 1.902-1.295 2.737-1.026 2.737-1.026.542 1.378.203 2.397.099 2.65a3.868 3.868 0 011.022 2.682c0 3.841-2.339 4.686-4.562 4.935.359.308.678.917.678 1.854 0 1.334-.012 2.417-.012 2.747 0 .278.211.597.688.504C19.145 20.198 22 16.442 22 12.017 22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
                          </svg>
                      </a>
                    )}
                  </div>
                  
                  <p className="text-gray-100 mb-2 text-sm leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-600/70 flex-wrap gap-2">
                    {/* Live Demo Button */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-1.5 bg-orange-500 text-white font-semibold rounded-full text-xs
                                                 hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                    >
                      Live Demo
                      <svg
                        className="w-3 h-3 ml-1"
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
                    <div className="flex items-center space-x-1 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${item.status === "Published"
                            ? "bg-green-300"
                            : "bg-orange-300"
                          } animate-pulse-fast`}
                      ></div>
                      <span
                        className={`${item.status === "Published"
                            ? "text-green-200"
                            : "text-orange-200"
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
        </div>

      </section>
    </>
  );
};

export default Research;