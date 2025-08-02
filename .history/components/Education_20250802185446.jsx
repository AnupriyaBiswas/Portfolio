import React from "react";

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
    notes: "Completed a comprehensive program focusing on software development, algorithms, and data structures.",
  },
  {
    id: 3,
    year: "Aug, 2017 – July 2019",
    degree: "Higher Secondary School",
    subject: "",
    institute: "St. Xavier's Institution",
    address: "Kolkata, West-Bengal",
    notes: "Achieved strong foundational knowledge across science disciplines, preparing for higher education.",
  },
  {
    id: 4,
    year: "April, 2003 – May, 2017",
    degree: "Secondary School",
    subject: "",
    institute: "St. Xavier's Institution",
    address: "Kolkata, West-Bengal",
    notes: "Achieved strong foundational knowledge across all subjects and domains.",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="min-h-screen transparent text-white relative overflow-hidden w-screen flex flex-col justify-center items-center py-10 sm:py-20"
    >
      {/* 🪐 Heading */}
      <div className="pt-0 pb-0 text-center z-10 relative px-4 w-full">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-0 leading-tight">
          <span className="text-orange-500">EDUCATION</span>{" "}
          <span className="text-white">JOURNEY</span>
        </h2>
      </div>

      {/* Education Timeline */}
      <div
        id="education-timeline-container"
        className="relative z-10 w-full max-w-5xl mx-auto py-8 px-4"
      >
        {/* Central Timeline Line (hidden on small screens) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full z-0"></div>

        {educationItems.map((item, index) => (
          <div
            key={item.id}
            className={`relative flex flex-col md:grid md:grid-cols-2 gap-x-16
                        ${
                          index === educationItems.length - 1
                            ? "mb-0"
                            : "mb-6 md:mb-12"
                        }`}
          >
            {/* Year text */}
            <div
              className={`md:absolute md:top-0 md:transform md:-translate-y-1/2 z-15 mb-2 md:mb-0
                ${
                  index % 2 === 0
                    ? "md:right-1/2 md:mr-8 md:text-right"
                    : "md:left-1/2 md:ml-8 md:text-left"
                }`}
              style={{ top: "16px" }}
            >
              <span className="text-orange-300 text-sm sm:text-base font-semibold whitespace-nowrap px-1 py-0.5">
                {item.year}
              </span>
            </div>

            {/* Timeline Dot (hidden on small screens) */}
            <div
              className="hidden md:flex absolute top-0 transform -translate-y-1/2 w-6 h-6 rounded-full
                          bg-orange-500 border-2 border-orange-300 z-10 items-center justify-center"
              style={{
                left: "50%",
                transform: "translateX(-50%) translateY(16px)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse-fast"></div>
            </div>

            {/* Card Content */}
            <div
              className={`w-full bg-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700
                          ${
                            index % 2 === 1
                              ? "md:col-start-1 md:col-end-2 md:text-right"
                              : "md:col-start-2 md:col-end-3 md:text-left"
                          }`}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400 mb-1 leading-tight">
                {item.degree}
              </h3>
              {item.subject && (
                <p className="text-gray-200 text-sm sm:text-base mb-1">
                  {item.subject}
                </p>
              )}
              <p className="text-gray-200 text-sm sm:text-base mb-1">
                {item.institute}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm italic mb-1">
                {item.address}
              </p>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {item.notes}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Education End Image */}
      <div className="mt-4 relative z-10">
        <img
          src="/assets/educationEnd.png"
          alt="End of Education Timeline"
          className="w-16 sm:w-20 md:w-24 h-auto mx-auto opacity-80"
        />
      </div>
    </section>
  );
};

export default Education;
