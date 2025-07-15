import React from "react";

const skills = {
  "Programming Languages": [
    "Python", "Java", "C/C++", "HTML/CSS", "SQL"
  ],
  "Developer Tools": [
    "Git", "GitHub", "VS Code", "Android Studio", "Jupyter Notebook", "WordPress"
  ],
  "Libraries & Frameworks": [
    "TensorFlow", "PyTorch", "Keras", "NumPy", "Pandas", "Scikit-learn", "OpenCV", "Matplotlib", "React", "Bootstrap", "Node.js"
  ],
  "Computer Science": [
    "Machine Learning", "Data Structures", "Algorithms", "Object-Oriented Programming (OOP)", "Data Structures and Algorithms"
  ],
  "Database & Backend Technologies": [
    "MySQL", "MongoDB", "REST APIs"
  ],
  "Operating Systems": [
    "Linux (Ubuntu)", "Windows", "Android"
  ]
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
    >
      {/* Moving Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 25}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-left mb-16">
          <h2 className="text-7xl md:text-8xl font-bold mb-4">
            <span className="text-orange-500">TECH</span>{" "}
            <span className="text-white">SKILLS</span>
          </h2>
          <div className="flex items-center space-x-4 mt-8">
            <div className="h-px bg-orange-500 w-16"></div>
            <div className="h-px bg-white w-8"></div>
            <div className="h-px bg-orange-500 w-16"></div>
          </div>
        </div>

        {/* Skills Categories */}
        <div className="space-y-12">
          {Object.entries(skills).map(([category, skillsList], categoryIndex) => (
            <div
              key={category}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${categoryIndex * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              {/* Category Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-orange-500 uppercase tracking-wide">
                {category}
              </h3>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skillsList.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative px-4 py-3 bg-gray-900 hover:bg-gray-800 transition-all duration-300 rounded-lg shadow-lg border border-gray-700 hover:border-orange-500 cursor-pointer transform hover:scale-105"
                    style={{
                      animationDelay: `${categoryIndex * 0.2 + index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="text-center">
                      <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-orange-400 transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-lg bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Lines */}
        <div className="flex justify-center items-center space-x-4 mt-20">
          <div className="h-px bg-orange-500 w-24"></div>
          <div className="h-px bg-white w-12"></div>
          <div className="h-px bg-orange-500 w-24"></div>
          <div className="h-px bg-white w-12"></div>
          <div className="h-px bg-orange-500 w-24"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-10px); }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-twinkle {
          animation: twinkle infinite ease-in-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Skills;