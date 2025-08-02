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

      <div className="relative z-10 w-full max-w-5xl mx-auto py-8 px-2 sm:px-4">
        {/* Central Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700 rounded-full z-0"></div>

        {educationItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`relative flex flex-col sm:flex-row cursor-pointer
                  ${index === educationItems.length - 1 ? "mb-0" : "mb-12 sm:mb-16"}`}
          >
            {/* Year */}
            <div
              className={`absolute top-0 z-20 
          ${index % 2 === 0 ? "left-[calc(50%+1.5rem)] text-left" : "right-[calc(50%+1.5rem)] text-right"}`}
            >
              <span className="text-orange-300 text-xs sm:text-sm font-semibold whitespace-nowrap px-2 py-0.5 bg-black/70 rounded">
                {item.year}
              </span>
            </div>

            {/* Dot */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 
                   rounded-full bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center"
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse"></div>
            </div>

            {/* Card */}
            <div
              className={`relative w-[80%] sm:w-[42%] p-4 sm:p-6 rounded-lg bg-black/40 border border-gray-700 
                    shadow-lg hover:shadow-orange-500/20 transition-all duration-300 mt-10 sm:mt-0
                    ${index % 2 === 0 ? "ml-auto sm:ml-[55%]" : "mr-auto sm:mr-[55%]"}`}
            >
              <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-1">
                {item.degree}
              </h3>
              {item.subject && (
                <p className="text-gray-200 text-sm sm:text-base mb-1">{item.subject}</p>
              )}
              <p className="text-gray-200 text-sm sm:text-base mb-1">{item.institute}</p>
              <p className="text-gray-400 text-xs sm:text-sm italic">{item.address}</p>
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
