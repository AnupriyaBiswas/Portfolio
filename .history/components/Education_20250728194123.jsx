import React, { useEffect, useState } from "react";

const educationItems = [
  {
    id: 1,
    year: "2023 - Present",
    degree: "Bachelor of Technology in Computer Science",
    institution: "National Institute of Technology, Rourkela",
    notes: "Specializing in AI/ML and Web Development. Dean's List Scholar.",
  },
  {
    id: 2,
    year: "2021",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "XYZ Public School, City, State",
    notes: "Achieved 95% in Science Stream. Actively participated in Robotics Club.",
  },
  {
    id: 3,
    year: "2019",
    degree: "Secondary School Certificate (SSC)",
    institution: "ABC High School, City, State",
    notes: "Graduated with Distinction. Led the school's Science Fair team.",
  },
  // Add more educational qualifications here following the same structure
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
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeInLeft {
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
            <span className="text-orange-500">EDUCATIONAL</span>{" "}
            <span className="text-white">JOURNEY</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mt-2 font-light max-w-2xl mx-auto">
            Charting the celestial path of knowledge and growth.
          </p>
        </div>

        {/* Education Timeline */}
        {/* Reduced py (vertical padding) for the overall timeline container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto py-12 px-4">
          {/* Central Timeline Line - Top/Bottom adjusted to fit content, not just 1/4 of total */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full"></div>

          {educationItems.map((item, index) => (
            <div
              key={item.id}
              // Re-inserted mb (margin-bottom) to create gap between cards
              className={`relative mb-10 flex items-center w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                // Reduced overall card width to create a "horizontally together" feel by pulling them closer to the center line.
                // Adjusted py for shorter cards, px for some internal padding.
                className={`w-full md:w-5/12 p-4 rounded-lg shadow-lg border border-gray-700/70
                            bg-gradient-to-br from-gray-900/80 to-black/70
                            transform transition-all duration-700 ease-in-out
                            ${
                              index % 2 === 0
                                ? "md:mr-8 animate-[fadeInRight_1s_ease-out_forwards]"
                                : "md:ml-8 animate-[fadeInLeft_1s_ease-out_forwards]"
                            }`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-1">
                  {item.degree}
                </h3>
                <p className="text-gray-200 text-lg mb-0.5">{item.institution}</p>
                <p className="text-gray-400 text-sm italic mb-2">{item.year}</p>
                {item.notes && (
                  <p className="text-gray-300 text-base leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse-fast"></div>
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