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
    notes: "Completed a comprehensive program focusing on software development, algorithms, and data structures. Gained hands-on experience in various programming paradigms.",
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
      className="min-h-screen bg-black text-white relative overflow-hidden w-screen flex flex-col justify-center items-center py-10 sm:py-20"
    >
      {/* 🪐 Heading */}
      <div className="pt-0 pb-0 text-center z-10 relative px-4 w-full">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-0">
          <span className="text-orange-500">EDUCATION</span>{" "}
          <span className="text-white">JOURNEY</span>
        </h2>
      </div>

      {/* Education Timeline */}
      <div
        id="education-timeline-container"
        className="relative z-10 w-full max-w-5xl mx-auto py-8 px-4"
      >
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full z-0"></div>

        {educationItems.map((item, index) => (
          <div
            key={item.id}
            className={`relative flex items-center md:grid md:grid-cols-2 gap-x-16
                        ${
                          index === educationItems.length - 1
                            ? "mb-0"
                            : "mb-8 md:mb-12"
                        }`}
          >
            {/* Card Content */}
            <div
              className={`w-full
                          ${
                            index % 2 === 1
                              ? "md:col-start-1 md:col-end-2 md:text-right"
                              : "md:col-start-2 md:col-end-3 md:text-left"
                          }`}
            >
              <div className="px-4 py-2">
                <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-0.5 leading-tight">
                  {item.degree}
                </h3>
                {item.subject && (
                  <p className="text-gray-200 text-lg mb-0.5">
                    {item.subject}
                  </p>
                )}
                <p className="text-gray-200 text-lg mb-0.5">
                  {item.institute}
                </p>
                <p className="text-gray-400 text-base italic mb-1">
                  {item.address}
                </p>
              </div>
            </div>

            {/* Year text */}
            <div
              className={`absolute top-0 transform -translate-y-1/2 z-15 ${
                index % 2 === 0
                  ? "right-1/2 mr-4 md:mr-8 text-right"
                  : "left-1/2 ml-4 md:ml-8 text-left"
              }`}
              style={{ top: "16px" }}
            >
              <span className="text-orange-300 text-xs md:text-sm font-semibold whitespace-nowrap px-1 py-0.5">
                {item.year}
              </span>
            </div>

            {/* Timeline Dot */}
            <div
              className="absolute top-0 transform -translate-y-1/2 w-6 h-6 rounded-full
                          bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center"
              style={{
                left: "50%",
                transform: "translateX(-50%) translateY(16px)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse-fast"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Education End Image */}
      <div className="mt-4 relative z-10">
        <img
          src="/assets/educationEnd.png"
          alt="End of Education Timeline"
          className="w-24 h-auto mx-auto opacity-80"
        />
      </div>
    </section>
  );
};

export default Education;
