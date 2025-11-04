// components/CustomCursor.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef();

  const updateMousePosition = useCallback((e) => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Hide ALL cursors including hover states
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      *:hover {
        cursor: none !important;
      }
      a, button, input, select, textarea, [role="button"] {
        cursor: none !important;
      }
      a:hover, button:hover, input:hover, select:hover, textarea:hover, [role="button"]:hover {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [updateMousePosition]);

  return (
    <div
      className="fixed top-0 left-0 w-7 h-7 pointer-events-none z-[9999]"
      style={{
        // Position the top-left corner of the image at the mouse cursor
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
        willChange: 'transform',
      }}
    >
      <Image
        src="/assets/Cursor.png"
        alt="Custom cursor"
        width={28}
        height={28}
        className="w-full h-full object-contain"
        draggable={false}
        priority
        unoptimized
      />
    </div>
  );
};

export default CustomCursor;
