import React from 'react';

// Spotlight component
const Spotlight = ({ className, fill }) => {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className || ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      style={{
        animation: 'spotlight 2s ease 0.75s 1 forwards'
      }}
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
};

const Skills = () => {
  const skills = [
    { name: 'Machine Learning', icon: 'fas fa-brain' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Artificial Intelligence', icon: 'fas fa-robot' },
    { name: 'JavaScript', icon: 'fab fa-js' },
    { name: 'R', icon: 'fab fa-r-project' },
    { name: 'SQL', icon: 'fas fa-database' },
    { name: 'Django', icon: 'fas fa-code' },
    { name: 'Full Stack Development', icon: 'fas fa-laptop-code' },
    { name: 'Github', icon: 'fab fa-github' },
    {name: 'Docker', icon: 'fab fa-docker'},
    {name: 'MongoDB', icon: 'fas fa-leaf'},
    {name: 'NodeJS', icon: 'fab fa-node-js'},
    {name: 'C', icon: 'fab fa-cuttlefish'},
  ];

  return (
    <div id='skills' className="relative min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden">
      {/* Font Awesome CSS */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
        crossOrigin="anonymous"
      />
      
      {/* Spotlight Effect */}
      <Spotlight className="top-[-20%] left-[-20%] md:left-[-10%] md:top-[-10%]" fill="white" />
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Content */}
      <div className="relative z-10 w-full lg:h-screen p-2">
        <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
          <div>
          <div className="mb-12">
            <p className="text-xl tracking-widest uppercase text-[#5651e5] mb-4">
              Skills
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              What I Can Do
            </h2>
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#5651e5]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <i className={`${skill.icon} text-4xl text-[#5651e5] relative z-10 group-hover:text-[#6c63ff] transition-colors duration-300`} />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-white text-center group-hover:text-[#5651e5] transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
        {/* Skills Section */}
        
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spotlight {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .bg-grid-white\/\[0\.02\] {
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .animate-spotlight {
          animation: spotlight 2s ease 0.75s 1 forwards;
        }
      `}</style>
    </div>
  );
};

export default Skills;