import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "WebDev", "AI/ML", "Desktop"];

const projects = [
  {
    title: "Portfolio Website",
    description: "A responsive developer portfolio built using Next.js and Tailwind CSS.",
    image: "/assets/projects/portfolio.png",
    link: "https://yourportfolio.com",
    category: "WebDev",
  },
  {
    title: "AI Chatbot",
    description: "An AI-powered chatbot using NLP and Transformer models for real-time responses.",
    image: "/assets/projects/chatbot.png",
    link: "https://aibot.com",
    category: "AI/ML",
  },
  {
    title: "Desktop Notes App",
    description: "A cross-platform desktop notes app built with Electron and React.",
    image: "/assets/projects/notesapp.png",
    link: "https://notesapp.com",
    category: "Desktop",
  },
  {
    title: "Stock Price Predictor",
    description: "Predicts stock prices using LSTM networks trained on historical data.",
    image: "/assets/projects/stocks.png",
    link: "https://stockpredict.com",
    category: "AI/ML",
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
    image: "/assets/projects/ecommerce.png",
    link: "https://ecommerce.com",
    category: "WebDev",
  },
  {
    title: "Computer Vision App",
    description: "Real-time object detection and classification using OpenCV and TensorFlow.",
    image: "/assets/projects/vision.png",
    link: "https://vision.com",
    category: "AI/ML",
  },
];

const ProjectCard = ({ project, index, isActive }) => (
  <div 
    className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 w-[280px] min-w-[280px] shrink-0 text-white shadow-xl border border-gray-700 transition-all duration-700 ${
      isActive 
        ? 'scale-105 border-orange-500 shadow-orange-500/20 z-10' 
        : 'scale-90 opacity-70 hover:opacity-90 hover:scale-95'
    }`}
    style={{
      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
    }}
  >
    <div className="relative overflow-hidden rounded-lg mb-4 group">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-400 transition-colors duration-300">{project.title}</h3>
    <p className="text-gray-300 text-xs mb-4 leading-relaxed line-clamp-3">{project.description}</p>
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 px-4 py-2 rounded-full text-white font-medium text-xs shadow-lg hover:shadow-orange-500/30 transform hover:translateY(-1px)"
    >
      Visit Project →
    </a>
  </div>
);

const ProjectShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sliderRef = useRef(null);
  const scrollInterval = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
    setActiveIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    const updateActiveIndex = () => {
      if (sliderRef.current) {
        const scrollLeft = sliderRef.current.scrollLeft;
        const cardWidth = 280 + 32; // card width + gap
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', updateActiveIndex);
      return () => slider.removeEventListener('scroll', updateActiveIndex);
    }
  }, [filteredProjects]);

  useEffect(() => {
    if (!isHovered && filteredProjects.length > 3) {
      scrollInterval.current = setInterval(() => {
        if (sliderRef.current) {
          const cardWidth = 280 + 32;
          const maxScroll = (filteredProjects.length - 1) * cardWidth;
          
          if (sliderRef.current.scrollLeft >= maxScroll) {
            sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }, 3000);
    }

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [filteredProjects, isHovered]);

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const cardWidth = 280 + 32;
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : filteredProjects.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < filteredProjects.length - 1 ? activeIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <section className="relative pt-20 md:pt-32 min-h-screen overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute top-10 right-0 z-0 opacity-40">
          <img
            src="/assets/projects/fishing.png"
            alt="fishing"
            className="w-[700px] opacity-60"
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 right-40 w-2 h-2 bg-orange-500 rounded-full" style={{animation: 'pulse 2s ease-in-out infinite'}}></div>
        <div className="absolute bottom-60 left-20 w-1 h-1 bg-white rounded-full" style={{animation: 'pulse 3s ease-in-out infinite'}}></div>
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>

        {/* Hero-style Heading - Exact match */}
        <div className="relative z-10 px-4 md:px-16">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight text-center mb-16">
            <span className="text-orange-500">PROJECT</span>
            <br />
            <span className="text-white">SHOWCASE</span>
          </h1>

          {/* Category Filters */}
          <div className="flex justify-center mt-16 gap-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-8 py-3 text-lg transition-all duration-500 shadow-lg font-semibold border-2 transform hover:scale-105 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-orange-500/30"
                    : "bg-gray-900 text-gray-300 border-gray-600 hover:border-orange-400 hover:text-orange-300"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All"
                  ? "🍊"
                  : cat === "WebDev"
                  ? "</>"
                  : cat === "AI/ML"
                  ? "⚙️"
                  : "🖥️"}{" "}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Carousel */}
        <div className="relative w-full mt-20">
          <div
            className="relative max-w-7xl mx-auto px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={sliderRef}
              className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar py-8 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={`${selectedCategory}-${idx}`} project={project} index={idx} />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-full shadow-2xl border border-gray-600 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/30"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-full shadow-2xl border border-gray-600 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/30"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </section>
    </>
  );
};

export default ProjectShowcase;