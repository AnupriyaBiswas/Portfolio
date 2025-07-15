import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export const PlanetSection = ({ children, delay = 0.2, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView]);

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      rotate: -45,
      y: 150,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        delay: delay,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`min-h-screen flex justify-center items-center px-6 ${className}`}
    >
      {children}
    </motion.section>
  );
};
