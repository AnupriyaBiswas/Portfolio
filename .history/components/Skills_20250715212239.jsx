import React, { useEffect, useRef, useState } from "react";

const skillsData = {
  FRONTEND: { icon: "skill1.png", angle: 0 },
  BACKEND: { icon: "skill2.png", angle: 60 },
  "AI / ML": { icon: "skill3.png", angle: 120 },
  DATABASE: { icon: "skill4.png", angle: 180 },
  TOOLS: { icon: "skill5.png", angle: 240 },
  SYSTEMS: { icon: "skill6.png", angle: 300 },
};

const Skills = () => {
  const [rotation, setRotation] = useState(0);
  const [orbitRadii, setOrbitRadii] = useState({ radiusX: 480, radiusY: 120 });
  const sectionRef = useRef(null);

  // SSR-safe orbit radius handling
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setOrbitRadii({ radiusX: 220, radiusY: 180 });
      } else if (width < 768) {
        setOrbitRadii({ radiusX: 320, radiusY: 160 });
      } else if (width < 1024) {
        setOrbitRadii({ radiusX: 400, radiusY: 140 });
      } else {
        setOrbitRadii({ radiusX: 480, radiusY: 120 });
      }
    };

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Planet rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.02);
    }, 50);
    return () => clearInterval(interval);
  }, []);


};

export default Skills;
