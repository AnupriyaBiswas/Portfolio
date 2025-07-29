import React, { useEffect, useState, useRef } from "react";

const educationItems = [
  {
    id: 1,
    year: "Aug, 2024 - Present",
    degree: "Master of Technology <br> Computer Science & Engineering",
    institution: "National Institute of Technology, Rourkela Odisha",
    notes: "",
  },
  {
    id: 2,
    year: "Aug, 2017 – July 2023",
    degree: "Bachelor of Technology    Computer Science & Engineering",
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
  const [dipPosition, setDipPosition] = useState(0);

  const dotRefs = useRef([]);
  const timelineContainerRef = useRef(null);

  // Variable to prevent multiple requestAnimationFrame calls per frame
  let ticking = useRef(false);

  // This useEffect ensures the refs array is correctly sized and populated
  useEffect(() => {
    dotRefs.current = dotRefs.current.slice(0, educationItems.length);
  }, [educationItems.length]);


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

    // --- Smooth Scroll tracking for timelineDip.png ---
    const calculateDipPositionSmooth = () => {
      // Ensure timelineContainerRef is attached and we have at least two dots to calculate range
      if (!timelineContainerRef.current || educationItems.length < 2 || !dotRefs.current[0] || !dotRefs.current[educationItems.length - 1]) {
        ticking.current = false; // Reset ticking if requirements not met
        return;
      }

      const containerRect = timelineContainerRef.current.getBoundingClientRect();

      // Get the absolute positions of the first and last dots in the document
      const firstDotRect = dotRefs.current[0].getBoundingClientRect();
      const lastDotRect = dotRefs.current[educationItems.length - 1].getBoundingClientRect();

      // Define the scroll range based on the vertical center of the first and last dots
      // These are document-relative Y coordinates
      const scrollRangeStart = (firstDotRect.top + firstDotRect.height / 2) + window.scrollY;
      const scrollRangeEnd = (lastDotRect.top + lastDotRect.height / 2) + window.scrollY;

      // Current scroll position based on viewport center
      const currentScrollY = window.scrollY + window.innerHeight / 2;

      // Calculate normalized scroll position (0 to 1)
      let normalizedScroll = 0;
      if (scrollRangeEnd > scrollRangeStart) {
          normalizedScroll = (currentScrollY - scrollRangeStart) / (scrollRangeEnd - scrollRangeStart);
      }
      // Clamp normalizedScroll between 0 and 1 to ensure it stays within the defined range
      normalizedScroll = Math.max(0, Math.min(1, normalizedScroll));

      // Calculate the target Y position for the image relative to the container's top
      // targetMinY and targetMaxY are the dot centers relative to the timelineContainerRef's top
      const targetMinY = (firstDotRect.top + firstDotRect.height / 2) - containerRect.top;
      const targetMaxY = (lastDotRect.top + lastDotRect.height / 2) - containerRect.top;

      // Interpolate the image's top position
      const newDipPosition = targetMinY + (targetMaxY - targetMinY) * normalizedScroll;

      // Adjust for the image's height (80px wide, so half is 40px)
      setDipPosition(newDipPosition - 40);

      ticking.current = false; // Reset ticking for the next frame
    };

    // Scroll event handler using requestAnimationFrame
    const handleScrollEvent = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(calculateDipPositionSmooth);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('resize', handleScrollEvent); // Recalculate on resize as positions change

    // Initial calculation after elements are rendered
    requestAnimationFrame(calculateDipPositionSmooth);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', handleScrollEvent);
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
        <div id="education-timeline-container" ref={timelineContainerRef} className="relative z-10 w-full max-w-5xl mx-auto py-8 px-4">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full z-0"></div>

          {educationItems.map((item, index) => (
            <div
              key={item.id}
              className="relative mb-4 md:mb-6 flex items-center md:grid md:grid-cols-2 gap-x-16"
            >
              {/* Card Content - Animations removed */}
              <div
                className={`w-full p-4 rounded-lg
                            ${
                              index % 2 === 0
                                ? "md:col-start-1 md:col-end-2 md:text-right md:pr-4"
                                : "md:col-start-2 md:col-end-3 md:text-left md:pl-4"
                            }`}
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
                ref={el => {
                  if (el) dotRefs.current[index] = el;
                }}
                className={`absolute top-0 transform -translate-y-1/2 w-6 h-6 rounded-full
                            bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center`}
                style={{ left: "50%", transform: "translateX(-50%) translateY(16px)" }}
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse-fast"></div>
              </div>
            </div>
          ))}

          {/* timelineDip.png image - Moved AFTER the map loop for higher DOM stacking order */}
          <img
            src="/assets/timelineDip.png"
            alt="Timeline Tracker"
            className="absolute left-1/2 transform -translate-x-1/2 z-40" // Increased z-index
            style={{
              top: `${dipPosition}px`,
              transition: 'top 0s',
              width: '80px', // Increased width
              height: 'auto',
            }}
          />

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