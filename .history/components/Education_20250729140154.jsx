import React, { useEffect, useState, useRef } from "react"; // Added useRef

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
    notes: "",
  },
];

const Education = () => {
  const [stars, setStars] = useState([]);
  const [dipPosition, setDipPosition] = useState(0); // State for the vertical position of timelineDip.png
  const dotRefs = useRef([]); // Create a ref to store references to each dot

  // Initialize dotRefs array to hold a ref for each item
  if (dotRefs.current.length !== educationItems.length) {
    dotRefs.current = Array(educationItems.length)
      .fill()
      .map((_, i) => dotRefs.current[i] || React.createRef());
  }

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

    // --- Scroll tracking for timelineDip.png ---
    const handleScroll = () => {
      let activeDotTop = 0;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2; // Center of the viewport

      dotRefs.current.forEach((ref, index) => {
        if (ref.current) {
          const dotRect = ref.current.getBoundingClientRect();
          // Calculate the vertical center of the dot relative to the viewport
          const dotCenterY = dotRect.top + dotRect.height / 2;

          // Find the dot closest to the viewport center
          const distance = Math.abs(dotCenterY - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            // The position should be relative to the timeline container's top
            // So, activeDotTop = dotRect.top + window.scrollY - timelineContainer.offsetTop;
            // However, we can simplify this if the image is within the same coordinate system.
            // Let's use the dot's top relative to the document, and adjust the image's top.
            activeDotTop = dotRect.top + window.scrollY;
          }
        }
      });

      // Adjust the final position to account for the image's height and desired alignment
      // Assuming timelineDip.png should center on the dot.
      // We need to calculate this relative to the containing timeline div's top
      // Find the timeline container to get its offsetTop
      const timelineContainer = document.getElementById('education-timeline-container');
      if (timelineContainer) {
          const containerOffsetTop = timelineContainer.offsetTop;
          // Calculate the position relative to the start of the timeline container
          const relativeTop = activeDotTop - containerOffsetTop;
          // Offset by half the dip image height to center it, or a specific value
          // Let's assume dip image is around 50px tall for initial adjustment
          setDipPosition(relativeTop - 25); // Adjust -25px for vertical centering
      }
    };

    // Add scroll listener and clean up
    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
        <div id="education-timeline-container" className="relative z-10 w-full max-w-5xl mx-auto py-8 px-4">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full z-0"></div>

          {/* timelineDip.png image */}
          <img
            src="/assets/timelineDip.png" // Path to your image
            alt="Timeline Tracker"
            className="absolute left-1/2 transform -translate-x-1/2 z-20"
            style={{
              top: `${dipPosition}px`,
              transition: 'top 0.3s ease-out', // Smooth transition for movement
              width: '50px', // Adjust width as needed for your image
              height: 'auto', // Maintain aspect ratio
            }}
          />

          {educationItems.map((item, index) => (
            <div
              key={item.id}
              className="relative mb-4 md:mb-6 flex items-center md:grid md:grid-cols-2 gap-x-16"
            >
              {/* Card Content */}
              <div
                className={`w-full p-4 rounded-lg
                            ${
                              index % 2 === 0
                                ? "md:col-start-1 md:col-end-2 md:text-right md:pr-4 animate-[fadeInLeft_1s_ease-out_forwards]"
                                : "md:col-start-2 md:col-end-3 md:text-left md:pl-4 animate-[fadeInRight_1s_ease-out_forwards]"
                            }`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-0 leading-tight">
                  {item.degree}
                </h3>
                <p className="text-gray-200 text-lg mb-0.5">{item.institution}</p>
                <p className="text-gray-400 text-sm italic mb-0">{item.year}</p>
                {item.notes && (
                  <p className="text-gray-300 text-base leading-relaxed mb-0">
                    {item.notes}
                  </p>
                )}
              </div>

              {/* Timeline Dot - Now with a ref */}
              <div
                ref={dotRefs.current[index]} // Assign ref to the dot
                className={`absolute top-0 transform -translate-y-1/2 w-6 h-6 rounded-full
                            bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center`}
                style={{ left: "50%", transform: "translateX(-50%) translateY(16px)" }}
              >
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