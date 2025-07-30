import React, { useEffect, useState, useRef } from "react";
import Image from "next/image"; // ✅ import for Next.js images

const researchItems = [
  {
    title: "Human Activity Recognition",
    summary: "Deep learning for improved Activity Recognition of Suspicious Activities on GPU and Jetson Orin Nano.",
    link: "https://example.com/research/neural-interfaces",
    github: "https://github.com/your-username/neural-interfaces",
    status: "Under Review",
  },
  {
    title: "Gait Analysis",
    summary: "EMG/IMU data fusion for Parkinson's disease gait pattern differentiation.",
    link: "https://example.com/research/gait-analysis",
    github: "https://github.com/your-username/gait-analysis",
    status: "In Progress",
  },
  {
    title: "Stock Market Trend Prediction",
    summary: "Predicting the Trend of Influential Stocks for better Decision-making in Trading.",
    link: "https://example.com/research/quantum-comm",
    github: "https://github.com/your-username/quantum-comm",
    status: "Completed",
  },
];

const Research = () => {
  const [stars, setStars] = useState([]);
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const spotlightIntervalRef = useRef(null);

  useEffect(() => {
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
          fallDuration: 25 + Math.random() * 20,
          twinkleDuration: 6 + Math.random() * 8,
        });
      }
      setStars(newStars);
    };

    generateStars();
    startCardHighlightOscillation();

    return () => clearInterval(spotlightIntervalRef.current);
  }, []);

  const startCardHighlightOscillation = () => {
    if (spotlightIntervalRef.current) {
      clearInterval(spotlightIntervalRef.current);
    }

    spotlightIntervalRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentSpotlightIndex((prevIndex) =>
          (prevIndex + 1) % researchItems.length
        );
      }
    }, 4000);
  };

  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 768) {
      setIsHovering(true);
      setCurrentSpotlightIndex(index);
      clearInterval(spotlightIntervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsHovering(false);
      startCardHighlightOscillation();
    }
  };

  return (
    <section
      id="research"
      className="min-h-screen bg-black text-white relative overflow-hidden w-screen flex flex-col justify-center items-center py-10 sm:py-20"
    >
      {/* Stars */}
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
              animation: `
                fall ${star.fallDuration}s linear infinite,
                twinkle ${star.twinkleDuration}s ease-in-out infinite
              `,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>

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
        @keyframes subtleGlowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.8);
          }
          50% {
            box-shadow: 0 0 40px rgba(249, 115, 22, 1);
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
      `}</style>

      <div className="pt-0 pb-0 text-center z-10 relative px-4 w-full">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-0">
          <span className="text-orange-500">RESEARCH</span>{" "}
          <span className="text-white">WORK</span>
        </h2>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-80px)] py-4">
        {/* Spotlight image */}
        <div className="hidden md:flex w-[30%] h-full items-center justify-center relative overflow-hidden">
          <Image
            src="/assets/spotlight.png"
            alt="Astronaut holding the Moon"
            width={400}
            height={400}
            className="h-auto w-full max-w-[90%] object-contain"
          />
        </div>

        {/* Research items */}
        <div className="w-full md:w-[70%] px-4 flex flex-col justify-between h-full max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-150px)]">
          {researchItems.map((item, index) => (
            <div
              key={index}
              className={`group relative my-2 p-4 md:p-5 rounded-lg overflow-hidden
                bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-transparent
                border border-gray-700/70
                transition-all duration-500 cursor-pointer
                shadow-lg hover:shadow-xl hover:shadow-orange-500/40
                md:opacity-80 md:scale-95
                md:hover:border-orange-600/80
                md:hover:-translate-y-1
                md:hover:scale-100
                md:hover:shadow-orange-500/25
                ${currentSpotlightIndex === index ? "md:opacity-100 md:scale-100 md:translate-y-0" : ""}
              `}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-y-0 left-0 w-full md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-[highlightStream_1.5s_ease-out_forwards_infinite_alternate]" />
              </div>

              <div
                className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none
                  md:group-hover:border-orange-500/80 transition-all duration-500"
                style={
                  currentSpotlightIndex === index
                    ? { animation: `subtleGlowPulse 2s infinite ease-in-out` }
                    : {}
                }
              />

              <div className="absolute top-0 bottom-0 left-0 w-16 md:w-20 flex items-center text-orange-200 text-6xl md:text-7xl font-bold opacity-50 pointer-events-none">
                <span className="leading-none pl-4">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
              </div>

              <div className="relative z-10 pl-16 md:pl-20">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-orange-50 transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 ml-4 p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/70 text-gray-200 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      {/* GitHub SVG */}
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504..."
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                </div>

                <p className="text-gray-100 mb-2 text-sm leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-600/70 flex-wrap gap-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-1.5 bg-orange-500 text-white font-semibold rounded-full text-xs
                      hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                  >
                    Live Demo
                  </a>
                  <div className="flex items-center space-x-1 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === "Completed" || item.status === "Published"
                          ? "bg-green-300"
                          : "bg-orange-300"
                      } animate-pulse-fast`}
                    />
                    <span
                      className={`${
                        item.status === "Completed" || item.status === "Published"
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
  );
};

export default Research;
