import React, { useEffect, useState, useRef } from "react";

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

// Helper function for debouncing
const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

const Education = () => {
  const [stars, setStars] = useState([]);
  const [dipPosition, setDipPosition] = useState(0);
  const dotRefs = useRef([]);
  const timelineContainerRef = useRef(null); // Ref for the main timeline container

  // Initialize dotRefs array to hold a ref for each item
  // This ensures the refs are always up-to-date with the number of items
  useEffect(() => {
    dotRefs.current = dotRefs.current.slice(0, educationItems.length);
    educationItems.forEach((_, i) => {
      if (!dotRefs.current[i]) {
        dotRefs.current[i] = React.createRef();
      }
    });
  }, [educationItems.length]); // Re-run if the number of education items changes

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

    // --- Scroll tracking for timelineDip.png ---
    const calculateDipPosition = () => {
      if (!timelineContainerRef.current) return;

      let activeDotTop = 0;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2; // Center of the viewport

      const containerRect = timelineContainerRef.current.getBoundingClientRect();
      const containerScrollTop = timelineContainerRef.current.scrollTop; // If container is scrollable itself
      const containerOffsetTop = containerRect.top + window.scrollY; // Top of container relative to document

      dotRefs.current.forEach((ref, index) => {
        if (ref.current) {
          const dotRect = ref.current.getBoundingClientRect();
          const dotCenterY = dotRect.top + dotRect.height / 2;

          const distance = Math.abs(dotCenterY - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            // Get the dot's center Y relative to the document
            const dotCenterYDoc = dotRect.top + window.scrollY + dotRect.height / 2;
            // Calculate position relative to the timeline container's top
            activeDotTop = dotCenterYDoc - containerOffsetTop;
          }
        }
      });

      // Adjust for the image's height to center it on the dot
      // Image height is 30px, so half is 15px
      setDipPosition(activeDotTop - 15);
    };

    // Debounce the scroll handler to improve performance
    const debouncedScrollHandler = debounce(calculateDipPosition, 50);

    // Add scroll listener and clean up
    window.addEventListener('scroll', debouncedScrollHandler);
    window.addEventListener('resize', debouncedScrollHandler); // Also recalculate on resize

    // Call once initially after elements have likely rendered
    // Use setTimeout to ensure DOM is ready, or run after a state update
    const initialPosTimeout = setTimeout(debouncedScrollHandler, 100);


    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
      window.removeEventListener('resize', debouncedScrollHandler);
      clearTimeout(initialPosTimeout);
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
        {/* Added ref to the main timeline container */}
        <div id="education-timeline-container" ref={timelineContainerRef} className="relative z-10 w-full max-w-5xl mx-auto py-8 px-4">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full z-0"></div>

          {/* timelineDip.png image */}
          <img
            src="/assets/timelineDip.png"
            alt="Timeline Tracker"
            className="absolute left-1/2 transform -translate-x-1/2 z-20"
            style={{
              top: `${dipPosition}px`,
              transition: 'top 0.3s ease-out',
              width: '30px', // Adjusted width for better proportion
              height: 'auto',
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