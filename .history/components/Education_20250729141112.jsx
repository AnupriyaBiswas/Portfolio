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
  const timelineContainerRef = useRef(null); // Ref for the main timeline container

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
      if (!timelineContainerRef.current) return;

      const containerRect = timelineContainerRef.current.getBoundingClientRect();
      const containerHeight = timelineContainerRef.current.offsetHeight; // Total rendered height of the container

      // Calculate how much of the timeline container is visible in the viewport
      // scrolledTop: how many pixels of the container are above the viewport's top
      const scrolledTop = -containerRect.top;

      // Calculate the total scrollable height for the effect.
      // This is the full height of the container minus the viewport height,
      // or simply the scroll distance from when the top of the container enters
      // the viewport until its bottom leaves the viewport.
      // Let's refine this to map the scroll position to the height of the timeline line.
      const timelineLineHeight = containerHeight; // Assuming line spans the container's height

      // current scroll position relative to the timeline container's start in the viewport
      // If the top of the container is at the viewport's top, scrollProgress = 0
      // If the bottom of the container is at the viewport's bottom, scrollProgress = 1
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (viewportCenter - containerRect.top) / containerRect.height // How far viewport center is into the container
          // Alternative: (scrolledTop + window.innerHeight / 2) / containerHeight
        )
      );

      // A more robust way: map scroll relative to the element
      const elementStart = containerRect.top + window.scrollY; // Absolute start of the container
      const elementEnd = elementStart + containerHeight; // Absolute end of the container

      const startTrackingPoint = elementStart + window.innerHeight * 0.2; // Start tracking when 20% of viewport enters
      const endTrackingPoint = elementEnd - window.innerHeight * 0.2;   // Stop tracking when 20% of viewport leaves

      // Calculate how far the current scroll is between the tracking start and end points
      const currentScrollY = window.scrollY + window.innerHeight / 2; // Check against viewport center

      let normalizedScroll = 0;
      if (currentScrollY > startTrackingPoint && currentScrollY < endTrackingPoint) {
          normalizedScroll = (currentScrollY - startTrackingPoint) / (endTrackingPoint - startTrackingPoint);
      } else if (currentScrollY >= endTrackingPoint) {
          normalizedScroll = 1;
      }

      // Map this normalized scroll to the height of the actual timeline line within the container
      // The image should move from the top of the first dot to the bottom of the last dot.
      // Let's get the absolute positions of the first and last dots if they exist
      const firstDotRect = dotRefs.current[0]?.current?.getBoundingClientRect();
      const lastDotRect = dotRefs.current[educationItems.length - 1]?.current?.getBoundingClientRect();

      let targetMinY = 0;
      let targetMaxY = timelineLineHeight;

      if (firstDotRect && lastDotRect) {
          targetMinY = (firstDotRect.top + firstDotRect.height / 2) - containerRect.top;
          targetMaxY = (lastDotRect.top + lastDotRect.height / 2) - containerRect.top;
      }


      // Interpolate the position:
      const newDipPosition = targetMinY + (targetMaxY - targetMinY) * normalizedScroll;

      // Adjust for the image's height to center it
      setDipPosition(newDipPosition - 30); // image width is 60px, so half is 30px
    };


    const debouncedScrollHandler = debounce(calculateDipPositionSmooth, 20); // Reduced debounce for smoother feel

    window.addEventListener('scroll', debouncedScrollHandler);
    window.addEventListener('resize', debouncedScrollHandler);

    // Initial calculation using requestAnimationFrame for correctness after render
    requestAnimationFrame(() => {
      calculateDipPositionSmooth();
    });

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
      window.removeEventListener('resize', debouncedScrollHandler);
    };
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

          {/* timelineDip.png image */}
          <img
            src="/assets/timelineDip.png"
            alt="Timeline Tracker"
            className="absolute left-1/2 transform -translate-x-1/2 z-20"
            style={{
              top: `${dipPosition}px`,
              transition: 'top 0.15s ease-out', // Smoother transition duration
              width: '60px', // Increased width
              height: 'auto',
            }}
          />

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
                ref={el => dotRefs.current[index] = el} // Ref callback for more reliable ref assignment
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