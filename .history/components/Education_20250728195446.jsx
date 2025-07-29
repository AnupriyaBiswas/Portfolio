import React, { useEffect, useState } from "react";

const educationItems = [
  {
    id: 1,
    year: "Aug, 2024 - Present",
    degree: "Master of Science in Computer Science & Engineering",
    institution: "National Institute of Technology, Rourkela, Odisha",
    notes: "",
  },
  {
    id: 2,
    year: "Aug, 2017 – July 2023",
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "RCC Institute of Information Technology, Kolkata, West-Bengal",
    notes: "",
  },
  {
    id: 3,
    year: "Aug, 2003 – July 2019",
    degree: "Higher Secondary",
    institution: "St. Xavier's Institution, Kolkata, West-Bengal",
    notes: "", // No specific notes provided in image_d43507.png
  },
  // Re-ordered to be chronological from most recent (top) to oldest (bottom) based on common CV practice.
  // Original dummy data is removed for clarity, using only your provided data.
];

const Education = () => {
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
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
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
        {/* Using a relative container for the timeline content, which aligns to left for mobile and becomes a 2-column grid for md+ */}
        <div className="relative z-10 w-full max-w-5xl mx-auto py-12 px-4">
          {/* Central Timeline Line - absolute to overlay the content */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full z-0"></div>

          {educationItems.map((item, index) => (
            <div
              key={item.id}
              // Each item takes full width on mobile, then becomes part of a two-column layout on md+
              className="relative mb-10 md:mb-16 flex items-center md:grid md:grid-cols-2 gap-x-16" // Adjusted mb for spacing
            >
              {/* Timeline Dot & Year - positioned on the line for desktop, inline for mobile */}
              <div
                className={`absolute top-0 md:relative md:col-start-1 md:col-end-3
                            left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full
                            bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center`}
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse-fast"></div>
              </div>

              {/* Year on the line (for desktop only) */}
              <div
                className={`hidden md:block absolute w-24 text-center font-bold text-lg top-0
                            ${
                              index % 2 === 0
                                ? "right-[calc(50%+4rem)] text-right" // 50% + 4rem (timeline dot + gap)
                                : "left-[calc(50%+4rem)] text-left"
                            }
                            text-gray-400`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                {item.year.split('–')[0].trim()} {/* Show only start year on the line */}
              </div>

              {/* Card Content */}
              <div
                className={`w-full p-4 rounded-lg
                            ${
                              index % 2 === 0
                                ? "md:col-start-1 md:col-end-2 md:text-right md:pr-12 animate-[fadeInLeft_1s_ease-out_forwards]" // Left side card
                                : "md:col-start-2 md:col-end-3 md:text-left md:pl-12 animate-[fadeInRight_1s_ease-out_forwards]" // Right side card
                            }`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-1 leading-tight"> {/* Removed whitespace-nowrap, overflow-hidden, text-ellipsis */}
                  {item.degree}
                </h3>
                <p className="text-gray-200 text-lg mb-0.5">{item.institution}</p>
                <p className="text-gray-400 text-sm italic mb-2">{item.year}</p> {/* Full year range here */}
                {item.notes && (
                  <p className="text-gray-300 text-base leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education End Image */}
        <div className="mt-8 relative z-10">
          <img
            src="/assets/educationEnd.png"
            alt="End of Education Timeline"
            className="max-w-xs md:max-w-sm h-auto mx-auto opacity-80"
          />
        </div>
      </section>
    </>
  );
};

export default Education;