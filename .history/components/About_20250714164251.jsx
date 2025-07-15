import React from "react";
import { Code, Database, Globe, Cpu, BookOpen, Award } from "lucide-react";

const About = () => {
  const skills = [
    { name: "Deep Learning", icon: Cpu, level: 85 },
    { name: "Web Development", icon: Globe, level: 90 },
    { name: "Blockchain", icon: Database, level: 75 },
    { name: "Python/JavaScript", icon: Code, level: 88 },
  ];

  const experiences = [
    {
      title: "AI Research Intern",
      company: "Tech Innovation Lab",
      period: "2024 - Present",
      description: "Working on advanced deep learning models and neural architectures for computer vision applications."
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2023 - 2024",
      description: "Developed scalable web applications using React, Node.js, and modern deployment practices."
    },
    {
      title: "Blockchain Developer",
      company: "CryptoSolutions",
      period: "2023",
      description: "Built decentralized applications and smart contracts on Ethereum blockchain."
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology",
      field: "Computer Science Engineering",
      institution: "National Institute of Technology",
      year: "2025",
      cgpa: "8.7/10"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Moon Surface Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600">
        {/* Multiple crater layers for depth */}
        <div className="absolute inset-0">
          {/* Large craters */}
          <div className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-60"></div>
          <div className="absolute top-[25%] right-[15%] w-24 h-24 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-50"></div>
          <div className="absolute bottom-[20%] left-[20%] w-40 h-40 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-40"></div>
          <div className="absolute bottom-[30%] right-[25%] w-28 h-28 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-45"></div>
          
          {/* Medium craters */}
          <div className="absolute top-[40%] left-[30%] w-16 h-16 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-35"></div>
          <div className="absolute top-[60%] right-[40%] w-20 h-20 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-30"></div>
          <div className="absolute top-[70%] left-[50%] w-12 h-12 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-25"></div>
          
          {/* Small craters */}
          <div className="absolute top-[35%] right-[60%] w-8 h-8 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-20"></div>
          <div className="absolute bottom-[45%] left-[60%] w-6 h-6 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-15"></div>
          <div className="absolute top-[50%] left-[70%] w-10 h-10 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-18"></div>
          
          {/* Tiny craters for texture */}
          <div className="absolute top-[80%] right-[30%] w-4 h-4 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-10"></div>
          <div className="absolute bottom-[60%] right-[50%] w-3 h-3 rounded-full bg-gradient-radial from-gray-900 via-gray-800 to-gray-700 shadow-inner opacity-8"></div>
        </div>
        
        {/* Surface texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-600/20 to-gray-800/40"></div>
        
        {/* Subtle lighting effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700/30 via-transparent to-gray-900/50"></div>
      </div>

      {/* Earth in the distance */}
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl shadow-blue-500/30 opacity-80">
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-400/40 via-transparent to-green-500/30"></div>
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-[15%] right-[30%] w-1 h-1 bg-white rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-[25%] left-[40%] w-1 h-1 bg-white rounded-full opacity-80 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[35%] right-[20%] w-1 h-1 bg-white rounded-full opacity-50 animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-[45%] left-[60%] w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-[55%] right-[70%] w-1 h-1 bg-white rounded-full opacity-30 animate-pulse" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            About <span className="text-blue-400 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-1">
            I'm a passionate Computer Science engineer with a deep interest in pushing the boundaries of technology. 
            My journey spans across artificial intelligence, web development, and blockchain technology.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-20 animate-fade-in-delay-2">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <skill.icon className="text-blue-400 mr-3 text-2xl" />
                  <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-gray-300 mt-2">{skill.level}% Proficiency</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-20 animate-fade-in-delay-3">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <span className="text-blue-400 font-medium">{exp.period}</span>
                </div>
                <p className="text-purple-300 font-medium mb-3">{exp.company}</p>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="animate-fade-in-delay-4">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Education</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-4">
              <BookOpen className="text-blue-400 mr-3 text-2xl" />
              <h3 className="text-2xl font-semibold text-white">{education[0].degree}</h3>
            </div>
            <p className="text-purple-300 font-medium text-lg mb-2">{education[0].field}</p>
            <p className="text-gray-300 mb-2">{education[0].institution}</p>
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-medium">Class of {education[0].year}</span>
              <span className="text-yellow-400 font-medium flex items-center">
                <Award className="mr-1" size={16} />
                CGPA: {education[0].cgpa}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }
        .animate-fade-in-delay-1 {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.6s both;
        }
        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease-out 0.8s both;
        }
        .animate-fade-in-delay-4 {
          animation: fadeIn 0.8s ease-out 1.0s both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default About;