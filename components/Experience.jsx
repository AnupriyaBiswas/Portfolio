import React from "react";

const Experience = () => {
  const experiences = [
    {
      company: "Wisdmlabs",
      role: "PHP Full-Stack Developer Intern",
      duration: "Dec 2023 — Mar 2024",
      location: "Mumbai, Maharashtra",
      responsibilities: [
        "Developed and customized WordPress plugins to enhance client-specific functionality.",
        "Worked on both front-end and back-end tasks using JavaScript, HTML, and CSS. Gained hands-on experience with WordPress architecture, hooks, and plugin lifecycle.",
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
          <span className="text-orange-500">EXPERIENCE</span>
        </h2>

        {/* Experience Timeline */}
        <div className="space-y-12 relative">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start gap-8">
                {/* Image positioned to match card height */}
                <div className="hidden md:flex flex-shrink-0 w-20 justify-center items-stretch">
                <img
                    src="/assets/planets.png"
                    alt="Planets"
                    className="w-auto object-contain"
                    style={{ height: '100%' }}
                />
                </div>


              {/* Experience card */}
              <div className="flex-1 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8 hover:border-orange-500/30 transition-all duration-300">
                {/* Company and duration */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {exp.company}
                    </h3>
                    <h4 className="text-lg md:text-xl text-orange-500 font-semibold mb-2">
                      {exp.role}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-lg font-medium">
                      {exp.duration}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {exp.location}
                    </p>
                  </div>
                </div>

                {/* Decorative line */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-0.5 bg-orange-500 mr-3"></div>
                  <div className="w-6 h-0.5 bg-white mr-3"></div>
                  <div className="w-3 h-0.5 bg-orange-500/60"></div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-4">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {responsibility}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills/Technologies used */}
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <div className="flex flex-wrap gap-2">
                    {["PHP", "WordPress", "JavaScript", "HTML", "CSS", "Agile"].map((skill, idx) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
