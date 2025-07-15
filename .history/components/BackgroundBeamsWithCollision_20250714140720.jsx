import React, { useRef, useState, useEffect } from "react";

// Utility function to combine class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(1200);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setIsClient(true);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateBeams = () => {
    const beamCount = Math.max(7, Math.floor(screenWidth / 150));
    const beams = [];

    for (let i = 0; i < beamCount; i++) {
      const xPosition = (screenWidth / (beamCount - 1)) * i;
      const randomOffset = Math.random() * 100 - 50;
      const finalX = Math.max(0, Math.min(screenWidth, xPosition + randomOffset));

      beams.push({
        initialX: finalX,
        translateX: finalX + (Math.random() * 200 - 100),
        duration: 3 + Math.random() * 8,
        repeatDelay: 1 + Math.random() * 4,
        delay: Math.random() * 6,
        className: Math.random() > 0.7 ? (Math.random() > 0.5 ? "h-6" : "h-20") : "h-12",
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
            transform: `translateX(${beamOptions.initialX || 0}px) translateY(-200px)`,
            animation: `beam-fall-${beamKey} ${beamOptions.duration || 8}s linear infinite`,
            animationDelay: `${beamOptions.delay || 0}s`,
          }}
        />
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
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
