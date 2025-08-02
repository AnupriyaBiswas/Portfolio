import React, { useState } from "react";

const educationItems = [
  {
    id: 1,
    year: "Aug, 2024 - Present",
    degree: "Master of Technology",
    subject: "Computer Science & Engineering",
    institute: "National Institute of Technology",
    address: "Rourkela, Odisha",
    logo: "/assets/nitrkl.png",
    note: "Currently pursuing and delving deeper into advanced computer science concepts and research methodologies.",
    details: { CGPA: "8.08" },
  },
  {
    id: 2,
    year: "Aug, 2017 – July 2023",
    degree: "Bachelor of Technology",
    subject: "Computer Science & Engineering",
    institute: "RCC Institute of Information Technology",
    address: "Kolkata, West-Bengal",
    logo: "/assets/rcciit.png",
    note: "Completed a comprehensive program focusing on software development, algorithms, and data structures.",
    details: { CGPA: "9.04" },
  },
  {
    id: 3,
    year: "Aug, 2017 – July 2019",
    degree: "Higher Secondary School",
    subject: "Science Stream",
    institute: "St. Xavier's Institution",
    address: "Kolkata, West-Bengal",
    logo: "/assets/sxi.png",
    note: "Excelled in Science Stream with strong focus on Physics, Chemistry, and Mathematics.",
    details: {
      Percentage: "95%",
      Subjects: "Physics, Chemistry, Maths, Computer Application, English, Bengali",
    },
  },
  {
    id: 4,
    year: "April, 2003 – May, 2017",
    degree: "Secondary School",
    subject: "General Education",
    institute: "St. Xavier's Institution",
    address: "Kolkata, West-Bengal",
    logo: "/assets/sxi.png",
    note: "Built a strong foundation across Science, Maths, Computer Application, and Humanities.",
    details: {
      Percentage: "92.8%",
      Subjects:
        "Science, Maths, Computer Application, English, Bengali, History & Geography",
    },
  },
];

const Education = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const closeModal = () => setSelectedItem(null);

  return (
    <section
      id="education"
      className="min-h-screen transparent text-white relative overflow-hidden w-screen flex flex-col justify-center items-center py-10 sm:py-20"
    >
      {/* Heading */}
      <div className="pt-0 pb-0 text-center z-10 relative px-2 sm:px-4 w-full">
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-0 leading-tight">
          <span className="text-orange-500">EDUCATION</span>{" "}
          <span className="text-white">JOURNEY</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative z-10 w-full max-w-5xl mx-auto py-8 px-2 sm:px-4">
        {/* Central Line */}
        <div className="absolute left-7 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-gray-700 rounded-full z-0"></div>

        {educationItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`relative flex md:grid md:grid-cols-2 gap-x-6 sm:gap-x-12 cursor-pointer 
                        ${index === educationItems.length - 1 ? "mb-0" : "mb-12 sm:mb-16"}`}
          >
            {/* Basic Info */}
            <div
              className={`w-full px-2 sm:px-4 max-w-xs sm:max-w-sm md:max-w-full break-words ml-12 md:ml-0
                ${index % 2 === 1 ? "md:col-start-1 md:text-right" : "md:col-start-2 md:text-left"}`}
              style={{ marginTop: "30px" }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400 mb-1">
                {item.degree}
              </h3>
              {item.subject && (
                <p className="text-gray-200 text-sm sm:text-base mb-1">{item.subject}</p>
              )}
              <p className="text-gray-200 text-sm sm:text-base mb-1">{item.institute}</p>
              <p className="text-gray-400 text-xs sm:text-sm italic">{item.address}</p>
            </div>

            {/* Year */}
            <div
              className={`absolute z-15 ${
                index % 2 === 0 ? "right-1/2 mr-1 sm:mr-4 text-right" : "left-1/2 ml-1 sm:ml-4 text-left"
              } md:block hidden`}
              style={{ top: "-10px" }}
            >
              <span className="text-orange-300 text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap px-1 py-0.5 bg-black/70 rounded">
                {item.year}
              </span>
            </div>

            {/* Mobile Year */}
            <div
              className="md:hidden absolute z-15 left-12"
              style={{ top: "-10px" }}
            >
              <span className="text-orange-300 text-[10px] sm:text-xs font-semibold whitespace-nowrap px-1 py-0.5 bg-black/70 rounded">
                {item.year}
              </span>
            </div>

            {/* Mobile Dot */}
            <div
              className="md:hidden absolute w-4 h-4 rounded-full bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center"
              style={{ left: "25px", transform: "translateX(-50%) translateY(8px)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-fast"></div>
            </div>
            
            {/* Desktop Dot */}
            <div
              className="hidden md:flex absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-orange-500 border-2 border-orange-300 z-10 items-center justify-center"
              style={{ left: "50%", transform: "translateX(-50%) translateY(8px)" }}
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse-fast"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[100]"
          onClick={closeModal}
        >
          <div
            className="relative bg-gray-900 rounded-xl p-6 sm:p-8 shadow-2xl border-2 border-orange-500 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Logo */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <img
                src={selectedItem.logo}
                alt={selectedItem.institute}
                className="w-24 h-24 object-contain drop-shadow-lg"
              />
            </div>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Content */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-orange-400 mb-2">{selectedItem.degree}</h3>
              <p className="text-lg text-gray-200 mb-1">{selectedItem.institute}</p>
              <p className="text-sm italic text-gray-400 mb-4">{selectedItem.address}</p>

              {/* Note */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {selectedItem.note}
              </p>

              {/* Academic Details */}
              {selectedItem.details.CGPA && (
                <p className="text-gray-200 text-base mb-2">
                  <span className="font-semibold">Graduated with a CGPA of </span> {selectedItem.details.CGPA}
                </p>
              )}
              {selectedItem.details.Percentage && (
                <p className="text-gray-200 text-base mb-2">
                  <span className="font-semibold">Passed with a Percentage of</span>{" "}
                  {selectedItem.details.Percentage}
                </p>
              )}
              {selectedItem.details.Subjects && (
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="font-semibold">Subjects:</span>{" "}
                  {selectedItem.details.Subjects}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Education;