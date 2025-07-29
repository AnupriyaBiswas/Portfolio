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
  // Adding your actual education data based on the provided image_d43507.png
  {
    id: 4,
    year: "Aug, 2003 – July 2019",
    degree: "Higher Secondary",
    institution: "St. Xavier's Institution, Kolkata, West-Bengal",
    notes: "", // No specific notes provided in the image
  },
  {
    id: 5,
    year: "Aug, 2017 – July 2023",
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "RCC Institute of Information Technology, Kolkata, West-Bengal",
    notes: "",
  },
  {
    id: 6,
    year: "Aug, 2024 – Present",
    degree: "Master of Science in Computer Science & Engineering",
    institution: "National Institute of Technology, Rourkela, Odisha",
    notes: "",
  },
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
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px); /* Fade in from slightly below */
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          /* Specific animations for left/right side cards */
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
        {/* Changed max-w-4xl to max-w-5xl for more horizontal room for cards */}
        <div className="relative z-10 w-full max-w-5xl mx-auto py-12 px-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full"></div> {/* Central Timeline Line */}

          {educationItems.map((item, index) => (
            <div
              key={item.id}
              // Each timeline item now takes full width, its children are positioned
              className={`relative mb-10 flex items-center h-auto`}
            >
              {/* Timeline Dot (still centered on the line) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse-fast"></div>
              </div>

              {/* Card content - now absolutely positioned based on index */}
              <div
                className={`w-full md:w-5/12 p-4 rounded-lg
                            transform transition-all duration-700 ease-in-out
                            ${
                              index % 2 === 0
                                ? "md:absolute md:right-1/2 md:mr-16 md:text-right animate-[fadeInLeft_1s_ease-out_forwards]" // Left side card
                                : "md:absolute md:left-1/2 md:ml-16 md:text-left animate-[fadeInRight_1s_ease-out_forwards]" // Right side card
                            }`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-1 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
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