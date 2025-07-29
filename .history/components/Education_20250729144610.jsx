import React, { useEffect, useState, useRef } from "react";

const educationItems = [
  {
    id: 1,
    year: "Aug, 2024 - Present",
    degree: "Master of Technology",
    subject: "Computer Science & Engineering",
    institute: "National Institute of Technology",
    address: "Rourkela, Odisha",
    notes: "Currently pursuing and delving deeper into advanced computer science concepts and research methodologies.",
  },
  {
    id: 2,
    year: "Aug, 2017 – July 2023",
    degree: "Bachelor of Technology",
    subject: "Computer Science & Engineering",
    institute: "RCC Institute of Information Technology",
    address: "Kolkata, West-Bengal",
    notes: "Completed a comprehensive program focusing on software development, algorithms, and data structures. Gained hands-on experience in various programming paradigms.",
  },
  {
    id: 3,
    year: "Aug, 2003 – July 2019",
    degree: "Higher Secondary",
    subject: "", // No specific subject for Higher Secondary in this context
    institute: "St. Xavier's Institution",
    address: "Kolkata, West-Bengal",
    notes: "Achieved strong foundational knowledge across science disciplines, preparing for higher education.",
  },
];

const Education = () => {
  const [stars, setStars] = useState([]);

  // All state/refs related to timelineDip.png movement are removed.

  useEffect(() => {
    // Generate random stars (existing logic)
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

  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <section
        id="education"
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

        {/* Removed keyframe animations for cards */}
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
        `}</style>

        {/* 🪐 Heading */}
        <div className="pt-0 pb-0 text-center z-10 relative px-4 w-full">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-0">
            <span className="text-orange-500">EDUCATION</span>{" "}
            <span className="text-white">JOURNEY</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mt-2 font-light max-w-2xl mx-auto">
            Charting the celestial path of knowledge and growth.
          </p>
        </div>

        {/* Education Timeline */}
        {/* timelineContainerRef removed as it's no longer needed */}
        <div id="education-timeline-container" className="relative z-10 w-full max-w-5xl mx-auto py-8 px-4">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full z-0"></div>

          {educationItems.map((item, index) => (
            <div
              key={item.id}
              className="relative mb-8 md:mb-12 flex items-center md:grid md:grid-cols-2 gap-x-16"
            >
              {/* Card Content - Removed background container. Adjusted padding and spacing. */}
              <div
                className={`w-full
                            ${
                              index % 2 === 0
                                ? "md:col-start-1 md:col-end-2 md:text-right"
                                : "md:col-start-2 md:col-end-3 md:text-left"
                            }`}
              >
                {/* Added internal padding for text block */}
                <div className="px-4 py-2">
                  <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-0.5 leading-tight">
                    {item.degree}
                  </h3>
                  {item.subject && ( // Conditionally render subject
                    <p className="text-gray-200 text-lg mb-0.5">{item.subject}</p>
                  )}
                  <p className="text-gray-200 text-lg mb-0.5">{item.institute}</p>
                  <p className="text-gray-400 text-base italic mb-1">{item.address}</p>
                  <p className="text-gray-400 text-sm mb-2">{item.year}</p> {/* Moved year to bottom */}
                  {item.notes && (
                    <p className="text-gray-300 text-base leading-relaxed">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Timeline Dot - dotRefs removed */}
              <div
                className={`absolute top-0 transform -translate-y-1/2 w-6 h-6 rounded-full
                            bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center`}
                style={{ left: "50%", transform: "translateX(-50%) translateY(16px)" }}
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse-fast"></div>
              </div>
            </div>
          ))}

          {/* timelineDip.png image and its related styling/movement logic is entirely removed */}

        </div>

        {/* Education End Image - Made much smaller */}
        <div className="mt-8 relative z-10">
          <img
            src="/assets/educationEnd.png"
            alt="End of Education Timeline"
            className="w-24 h-auto mx-auto opacity-80" // Significantly smaller width
          />
        </div>
      </section>
    </>
  );
};

export default Education;