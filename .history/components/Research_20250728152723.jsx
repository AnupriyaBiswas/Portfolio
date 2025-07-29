import React, { useEffect, useState, useRef } from "react";

const researchItems = [
  {
    title: "Optimizing Neural Interfaces",
    summary: "Deep learning for improved latency & accuracy in prosthetic control.",
    link: "https://example.com/research/neural-interfaces",
    status: "Published",
  },
  {
    title: "Human Gait Analysis",
    summary: "EMG/IMU data fusion for Parkinson's disease gait pattern differentiation.",
    link: "https://example.com/research/gait-analysis",
    status: "Published",
  },
  {
    title: "Quantum Secure Communication",
    summary: "Exploring quantum entanglement for unhackable communication channels.",
    link: "https://example.com/research/quantum-comm",
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

        {/* 🪐 Heading */}
        <div className="pt-0 pb-0 text-center z-10 relative px-4 w-full">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-0">
            <span className="text-orange-500">RESEARCH</span>{" "}
            <span className="text-white">WORK</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-0 font-light max-w-2xl mx-auto">
            Accessing encrypted research chronicles from the farthest reaches of knowledge.
          </p>
        </div>

        {/* Main Content Area: Spotlight on Left, Research Streams on Right */}
        {/* Adjusted min-h and py for better vertical fitting */}
        <div className="relative z-10 w-full flex items-center justify-center min-h-[calc(100vh80px)] md:min-h-[calc(100vh-200px)] py-4">
          {/* Left Side: Spotlight Image Container - Fixed and Hidden on Mobile */}
          {/* Added overflow-hidden to prevent image repetition/bleed if present */}
          <div className="hidden md:flex w-[40%] h-full items-center justify-center relative overflow-hidden">
            <img
              src="/assets/spotlight.jpg" // Confirmed .jpg extension. Double-check path!
              alt="Astronaut holding the Moon as a focus element"
              className="h-auto w-full max-w-[90%] object-contain" // Ensures image scales down to fit
            />
          </div>

          {/* Right Side: Research Data Streams */}
          {/* Crucial overflow fix: Adjusted max-h, added justify-between, and responsive padding */}
          {/* Removed overflow-y-auto unless absolutely necessary, to prevent scrollbars */}
          <div className="w-full md:w-[60%] px-4 flex flex-col justify-between h-full max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-150px)]">
            {researchItems.map((item, index) => (
              <div
                key={index}
                // Conditional classes for hover effects based on screen size
                className={`group relative my-2 p-4 md:p-5 rounded-lg overflow-hidden
                                    bg-gradient-to-r from-gray-900/70 via-gray-900/60 to-transparent
                                    border border-gray-800/50
                                    transition-all duration-500 cursor-pointer
                                    shadow-lg

                                    // Default (mobile) state: no hover effects
                                    opacity-100 scale-100
                                    
                                    // md and larger: apply initial faded state and hover effects
                                    md:opacity-40 md:scale-95
                                    md:hover:border-orange-600/70
                                    md:hover:-translate-y-0.5
                                    md:hover:scale-100
                                    md:hover:shadow-orange-500/15

                                    // Highlighted state (overrides default/hover for md+ screens)
                                    ${currentSpotlightIndex === index ? 'md:opacity-100 md:scale-100' : ''}
                                    transition-opacity transition-transform duration-500 ease-in-out`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Animated highlight stream on hover (only md and larger) */}
                <div className="absolute inset-y-0 left-0 w-1/4 bg-orange-500/10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-[highlightStream_1.5s_ease-out_forwards_infinite_alternate]"></div>
                </div>

                {/* Data stream "circuitry" / outline (only md and larger) */}
                <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none
                                    md:group-hover:border-orange-500/50 transition-all duration-500"
                  style={currentSpotlightIndex === index ? { animation: `subtleGlowPulse 2s infinite ease-in-out` } : {}}>
                </div>

                {/* Data Index / Chrono-Log Number */}
                <div className="absolute top-4 left-4 text-orange-400 text-xl font-bold opacity-60">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="relative z-10 pl-12 md:pl-16">
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-white group-hover:text-orange-100 transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mb-2 text-sm leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-800/50">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-1.5 bg-orange-500 text-white font-semibold rounded-full text-xs
                                                hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                    >
                      View Research
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
                            ? "bg-green-500"
                            : "bg-orange-500"
                          } animate-pulse-fast`}
                      ></div>
                      <span
                        className={`${item.status === "Published"
                            ? "text-green-400"
                            : "text-orange-400"
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