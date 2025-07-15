import React, { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(1200); // Always start with default value
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set initial screen width and mark as client-side
    setScreenWidth(window.innerWidth);
    setIsClient(true);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate beams based on screen width
  const generateBeams = () => {
    const beamCount = Math.max(7, Math.floor(screenWidth / 150)); // At least 7 beams, more for wider screens
    const beams = [];
    
    for (let i = 0; i < beamCount; i++) {
      const xPosition = (screenWidth / (beamCount - 1)) * i;
      const randomOffset = Math.random() * 100 - 50; // Random offset of -50 to 50px
      const finalX = Math.max(0, Math.min(screenWidth, xPosition + randomOffset));
      
      beams.push({
        initialX: finalX,
        translateX: finalX + (Math.random() * 200 - 100), // Random horizontal movement
        duration: 3 + Math.random() * 8, // 3-11 seconds
        repeatDelay: 1 + Math.random() * 4, // 1-5 seconds
        delay: Math.random() * 6, // 0-6 seconds
        className: Math.random() > 0.7 ? (Math.random() > 0.5 ? "h-6" : "h-20") : "h-12", // Varied heights
      });
    }
    
    return beams;
  };

  const beams = generateBeams();

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-screen relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
      style={{
        backgroundColor: "#1a1a1a",
      }}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={`beam-${index}-${beam.initialX}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}
      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none"
        style={{
          backgroundColor: "#1a1a1a",
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef(
  ({ parentRef, containerRef, beamOptions = {} }, ref) => {
    const beamRef = useRef(null);
    const [collision, setCollision] = useState({
      detected: false,
      coordinates: null,
    });
    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
      const checkCollision = () => {
        if (
          beamRef.current &&
          containerRef.current &&
          parentRef.current &&
          !cycleCollisionDetected
        ) {
          const beamRect = beamRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const parentRect = parentRef.current.getBoundingClientRect();

          if (beamRect.bottom >= containerRect.top) {
            const relativeX =
              beamRect.left - parentRect.left + beamRect.width / 2;
            const relativeY = beamRect.bottom - parentRect.top;

            setCollision({
              detected: true,
              coordinates: {
                x: relativeX,
                y: relativeY,
              },
            });
            setCycleCollisionDetected(true);
          }
        }
      };

      const animationInterval = setInterval(checkCollision, 50);

      return () => clearInterval(animationInterval);
    }, [cycleCollisionDetected, containerRef]);

    useEffect(() => {
      if (collision.detected && collision.coordinates) {
        setTimeout(() => {
          setCollision({ detected: false, coordinates: null });
          setCycleCollisionDetected(false);
        }, 2000);

        setTimeout(() => {
          setBeamKey((prevKey) => prevKey + 1);
        }, 2000);
      }
    }, [collision]);

    return (
      <>
        <div
          key={beamKey}
          ref={beamRef}
          className={cn(
            "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent animate-pulse",
            beamOptions.className
          )}
          style={{
            transform: `translateX(${
              beamOptions.initialX || 0
            }px) translateY(-200px)`,
            animation: `beam-fall-${beamKey} ${
              beamOptions.duration || 8
            }s linear infinite`,
            animationDelay: `${beamOptions.delay || 0}s`,
          }}
        />
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <style jsx>{`
          @keyframes beam-fall-${beamKey} {
            0% {
              transform: translateX(${beamOptions.initialX || 0}px)
                translateY(-200px);
            }
            100% {
              transform: translateX(${beamOptions.translateX || 0}px)
                translateY(1800px);
            }
          }
        `}</style>
      </>
    );
  }
);

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <div className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm animate-pulse"></div>
      {spans.map((span) => (
        <span
          key={span.id}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500 animate-ping"
          style={{
            transform: `translate(${span.directionX}px, ${span.directionY}px)`,
            animationDuration: `${Math.random() * 1.5 + 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

// Social Icon Component
const SocialIcon = ({ href, icon: Icon, delay = 0 }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative transform transition-all duration-300 hover:scale-105"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="relative rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-gray-400/20 p-6 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-300/50">
        <Icon className="text-white group-hover:text-purple-400 transition-colors duration-300 text-xl" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </a>
  );
};

const Main = () => {
  return (
    <div id="home" className="w-full">
      <BackgroundBeamsWithCollision>
        <div className="relative z-10 max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
          <div className="text-center">
            <h1 className="py-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-fade-in">
              Hi, I&#39;m{" "}
              <span className="text-purple-400 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                {" "}
                Suman
              </span>
            </h1>

            <h3 className="py-2 text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent animate-fade-in-delay-1">
              Web Developer | Web3 & Cybersecurity Enthusiast
            </h3>

            <p className="py-4 text-gray-300 sm:max-w-[70%] m-auto text-sm leading-relaxed animate-fade-in-delay-3">
              Passionate web developer with a strong grasp of full-stack
              technologies, cybersecurity, and UI/UX. Exploring Web3, smart
              contracts, and building secure, scalable digital solutions.
            </p>

            <div className="flex items-center justify-center gap-6 max-w-[330px] m-auto py-8 animate-fade-in-delay-2">
              <SocialIcon
                href="https://www.linkedin.com/in/sumanitian/"
                icon={Linkedin}
                delay={1000}
              />
              <SocialIcon
                href="https://github.com/sumanitian"
                icon={Github}
                delay={1200}
              />
              <SocialIcon
                href="https://medium.com/@sumanitian"
                icon={FileText}
                delay={1400}
              />
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

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

export default Main;