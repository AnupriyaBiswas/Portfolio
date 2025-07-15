import React from "react";
import { Code, Brain, Blocks, Server, Database, Zap } from "lucide-react";

const About = () => {
  const skills = [
    {
      category: "AI & Machine Learning",
      icon: Brain,
      items: ["Deep Learning", "Neural Networks", "Computer Vision", "NLP", "PyTorch", "TensorFlow"],
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Web Development",
      icon: Code,
      items: ["React", "Node.js", "JavaScript", "TypeScript", "HTML/CSS", "Next.js"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Blockchain",
      icon: Blocks,
      items: ["Ethereum", "Smart Contracts", "Solidity", "Web3.js", "DeFi", "NFTs"],
      color: "from-green-500 to-teal-500"
    },
    {
      category: "Backend & Database",
      icon: Server,
      items: ["Python", "MongoDB", "PostgreSQL", "Express.js", "REST APIs", "GraphQL"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const experiences = [
    {
      title: "AI Research Assistant",
      organization: "University Research Lab",
      duration: "2023 - Present",
      description: "Conducting research on deep learning architectures and contributing to publications in computer vision and natural language processing."
    },
    {
      title: "Full-Stack Developer",
      organization: "Tech Startup",
      duration: "2022 - 2023",
      description: "Developed and maintained web applications using React, Node.js, and MongoDB. Implemented blockchain integration for decentralized features."
    },
    {
      title: "Machine Learning Intern",
      organization: "AI Company",
      duration: "Summer 2022",
      description: "Built predictive models using PyTorch and contributed to the development of computer vision applications for real-world deployment."
    }
  ];

  const achievements = [
    "Published 3 research papers in AI conferences",
    "Won Best Innovation Award at Tech Hackathon 2023",
    "Contributed to 5+ open-source ML projects",
    "Mentored 20+ students in AI/ML workshops"
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/moon-bg.png')",
          filter: "brightness(0.3)"
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            About <span className="text-purple-400 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-1">
            I'm a passionate Computer Science engineer with a deep fascination for the intersection of 
            artificial intelligence, blockchain technology, and modern web development. My journey involves 
            pushing the boundaries of what's possible through innovative research and practical applications.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fade-in-delay-2">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 animate-fade-in-delay-3"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} mr-4`}>
                    <skill.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fade-in-delay-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 animate-fade-in-delay-5"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <span className="text-purple-300 font-medium">{exp.duration}</span>
                </div>
                <p className="text-purple-400 font-medium mb-2">{exp.organization}</p>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fade-in-delay-6">
            Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 animate-fade-in-delay-7"
                style={{ animationDelay: `${1.6 + index * 0.1}s` }}
              >
                <Zap className="text-purple-400 w-6 h-6 mr-3 flex-shrink-0" />
                <span className="text-gray-300">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Touch */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 animate-fade-in-delay-8">
            <h2 className="text-2xl font-bold text-white mb-4">Beyond the Code</h2>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              When I'm not diving deep into neural networks or building the next big web application, 
              you can find me exploring the latest research papers, contributing to open-source projects, 
              or sharing knowledge through technical blogs and workshops. I believe in the power of 
              technology to solve real-world problems and create meaningful impact.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
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
        .animate-fade-in-delay-5 {
          animation: fadeIn 0.8s ease-out 1.2s both;
        }
        .animate-fade-in-delay-6 {
          animation: fadeIn 0.8s ease-out 1.4s both;
        }
        .animate-fade-in-delay-7 {
          animation: fadeIn 0.8s ease-out 1.6s both;
        }
        .animate-fade-in-delay-8 {
          animation: fadeIn 0.8s ease-out 1.8s both;
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