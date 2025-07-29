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
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0); // Which card is spotlighted (0, 1, 2)
  const [isHovering, setIsHovering] = useState(false); // Flag if user is hovering over any card
  const spotlightIntervalRef = useRef(null); // Ref to hold the interval ID
  const cardRefs = useRef([]); // Ref to hold references to each card for precise positioning

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

    // Start spotlight oscillation
    startSpotlightOscillation();

    // Cleanup interval on component unmount
    return () => clearInterval(spotlightIntervalRef.current);
  }, []);

  const startSpotlightOscillation = () => {
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
    }, 4000); // Change spotlight every 4 seconds
  };

  const handleMouseEnter = (index) => {
    setIsHovering(true);
    setCurrentSpotlightIndex(index); // Fix spotlight on hovered card
    clearInterval(spotlightIntervalRef.current); // Stop oscillation
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    startSpotlightOscillation(); // Resume oscillation
  };

  // Calculate the Y position for the spotlight image
  // This will align the astronaut with the center of the currently spotlighted card
  const getSpotlightYPosition = () => {
    if (cardRefs.current[currentSpotlightIndex]) {
      const cardElement = cardRefs.current[currentSpotlightIndex];
      const cardRect = cardElement.getBoundingClientRect();
      // Calculate center of the card relative to the viewport
      const cardCenterY = cardRect.top + cardRect.height / 2;

      // Find the center of the spotlight container (which is typically the main flex item for the left side)
      // We assume the main content area has `items-center` so its children are centered,
      // and we want to position the astronaut relative to this centered block.
      // We also need to factor in the astronaut image's own height to center it.
      // For simplicity, we'll align the *center* of the astronaut image with the *center* of the card.
      // The astronaut image's max-height is 80% of its container, so we'll use a rough estimate for its height.
      // This might require fine-tuning after initial render.
      // A more robust solution would measure the astronaut image itself.
      // For now, let's just align the top of the spotlight image's container with the top of the card.
      return cardCenterY; // This will be a pixel value, use transform to position it.
    }
    return '50%'; // Default to center if no card is found
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
        <div className="pt-10 pb-8 text-center z-10 relative px-4 w-full">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-orange-500">RESEARCH</span>{" "}
            <span className="text-white">WORK</span> {/* Changed to match screenshot */}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-2 font-light max-w-2xl mx-auto">
            Accessing encrypted research chronicles from the farthest reaches of knowledge.
          </p>
        </div>

        {/* Main Content Area: Spotlight on Left, Research Streams on Right */}
        <div className="relative z-10 w-full flex items-center justify-center min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] py-4">
            {/* Left Side: Spotlight Image Container */}
            {/* Removed rotation, now positions vertically based on active card */}
            <div className="hidden md:flex w-[40%] h-full items-center justify-end relative pr-8">
                <img
                    src="/assets/spotlight.jpg" // IMPORTANT: Confirm this path. If directly in public folder, use /spotlight.png
                    alt="Spotlight"
                    className="absolute right-0 h-auto w-full max-w-[80%] object-contain transition-all duration-700 ease-in-out"
                    style={{
                      top: getSpotlightYPosition(),
                      transform: 'translateY(-50%)', // Center the image vertically at the calculated 'top'
                    }}
                />
            </div>

            {/* Right Side: Research Data Streams */}
            <div className="w-full md:w-[60%] px-4 md:px-0 flex flex-col justify-evenly h-full max-h-[calc(100vh-200px)] overflow-hidden">
                {researchItems.map((item, index) => (
                    <div
                        key={index}
                        ref={el => cardRefs.current[index] = el} // Assign ref to each card
                        className={`group relative my-2 p-4 md:p-5 rounded-lg overflow-hidden
                                    bg-gradient-to-r from-gray-900/70 via-gray-900/60 to-transparent
                                    border border-gray-800/50 hover:border-orange-600/70
                                    transition-all duration-500 cursor-pointer
                                    transform hover:-translate-y-0.5 hover:scale-100
                                    shadow-lg hover:shadow-orange-500/15
                                    ${currentSpotlightIndex === index ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}
                                    transition-opacity transition-transform duration-500 ease-in-out`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Animated highlight stream on hover */}
                        <div className="absolute inset-y-0 left-0 w-1/4 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-[highlightStream_1.5s_ease-out_forwards_infinite_alternate]"></div>
                        </div>

                        {/* Data stream "circuitry" / outline */}
                        <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none
                                    group-hover:border-orange-500/50 transition-all duration-500"
                            style={currentSpotlightIndex === index ? { animation: `subtleGlowPulse 2s infinite ease-in-out` } : {}}>
                        </div>

                        {/* Data Index / Chrono-Log Number (Match screenshot style) */}
                        <div className="absolute top-4 left-4 text-orange-400 text-xl font-bold opacity-60"> {/* Adjusted position and size */}
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
                                    View Research {/* Changed text to match screenshot */}
                                    <svg
                                        className="w-3 h-3 ml-1" // Removed group-hover:translate-x-1 as it's not in the screenshot
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

                                {/* Status badge (Match screenshot style with circle + text) */}
                                <div className="flex items-center space-x-1 text-xs">
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            item.status === "Published"
                                                ? "bg-green-500"
                                                : "bg-orange-500" // Changed In Progress to orange like the screenshot
                                        } animate-pulse-fast`}
                                    ></div>
                                    <span
                                        className={`${
                                            item.status === "Published"
                                                ? "text-green-400"
                                                : "text-orange-400" // Changed text color for In Progress
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


        {/* Cosmic Data Flow Separator */}
        <div className="mt-8 flex justify-center relative z-10">
          <div className="w-80 h-1.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full relative">
            <div className="absolute inset-0 bg-blue-400/30 blur-sm rounded-full animate-[highlightStream_3s_ease-out_infinite_alternate_reverse]"></div>
            <div className="absolute -left-2 top-0 w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast"></div>
            <div className="absolute -right-2 top-0 w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast delay-700"></div>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-2 relative z-10">End of Transmissions</p>
      </section>
    </>
  );
};

export default Research;