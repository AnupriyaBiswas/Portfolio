import React from "react";
import Image from "next/image";

const Experience = () => {
  const experiences = [
    {
      company: "Wisdmlabs",
      role: "Full-Stack Developer Intern",
      duration: "Dec 2023 — Mar 2024",
      location: "Mumbai, Maharashtra",
      responsibilities: [
        "Developed and customized WordPress plugins to enhance client-specific functionality.",
        "Worked on both front-end and back-end tasks using JavaScript, HTML, and CSS.",
        "Gained hands-on experience with WordPress architecture, hooks, and plugin lifecycle.",
        "Collaborated with senior developers in an Agile environment to deliver timely updates and feature rollouts."
      ]
    }
  ];

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 transparent text-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl w-full">
        {/* Heading */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 text-left">
          <span className="text-orange-500">WORK</span>{" "}
          <span className="text-white">EXPERIENCE</span>
        </h2>

        {/* Experience Timeline */}
        <div className="space-y-12 relative">
          {/* Vertical timeline accent */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-400 to-transparent hidden md:block"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 top-12 w-5 h-5 bg-orange-500 rounded-full border-4 border-gray-900 shadow-lg shadow-orange-500/30 hidden md:block"></div>

              {/* Main content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:ml-16">

                {/* Left: Company Info */}
                <div className="lg:col-span-1 flex flex-col justify-between">
                  <div className="p-6">

                    {/* Company Logo and Name */}
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/assets/Wisdmlabs.png"
                        alt="Wisdmlabs Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain rounded-lg"
                      />
                      <h3 className="text-4xl font-bold text-white">
                        {exp.company}
                      </h3>
                    </div>

                    <h4 className="text-lg text-orange-500 font-semibold mb-4">
                      {exp.role}
                    </h4>
                    <div className="space-y-2 text-gray-400">
                      <p className="font-medium">{exp.duration}</p>
                      <p className="text-sm">{exp.location}</p>
                    </div>
                  </div>

                  {/* Hammock Image - aligned to bottom */}
                  <div className="hidden lg:flex justify-center items-end flex-grow">
                    <Image
                      src="/assets/hammock.png"
                      alt="Hammock"
                      width={180}
                      height={120}
                      className="w-45 h-auto object-contain opacity-60"
                    />
                  </div>
                </div>

                {/* Right: Responsibilities */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300">

                    {/* Responsibilities */}
                    <div className="space-y-6">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                          <p className="text-gray-400 text-lg leading-relaxed">
                            {responsibility}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Decorative elements */}
                    <div className="flex items-center mt-6">
                      <div className="w-36 h-0.5 bg-orange-500 mr-4"></div>
                      <div className="w-28 h-0.5 bg-white mr-4"></div>
                      <div className="w-20 h-0.5 bg-orange-500/60 mr-4"></div>
                      <div className="w-14 h-0.5 bg-gray-500/60 mr-4"></div>
                    </div>

                    {/* Skills */}
                    <div className="mt-8">
                      <div className="flex flex-wrap gap-2">
                        {["WordPress", "JavaScript", "HTML", "CSS", "javaScript", "Agile"].map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
