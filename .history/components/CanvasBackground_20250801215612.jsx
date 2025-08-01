import React, { useEffect, useRef } from "react";

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const stars = [];
    const numberOfStars = 150; // Adjust this number for the density of your slow falling stars

    // Initialize stars with random positions and properties
    for (let i = 0; i < numberOfStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2, // Random speed for varied falling
        size: Math.random() * 1.5 + 0.5 // Random size for varied appearance
      });
    }

    // Function to handle canvas resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // When resized, stars will continue their path and wrap around.
      // No need to re-initialize all stars unless you want them to instantly
      // redistribute across the new canvas size, which might look jarring.
    };

    // Set initial canvas dimensions
    handleResize();

    // Add resize listener to make the canvas responsive
    window.addEventListener("resize", handleResize);

    // Animation loop for drawing and updating stars
    const animate = () => {
      // Clear the entire canvas for the next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update each falling star
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Draw the star as a simple white circle
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Update star position: move downwards
        star.y += star.speed;

        // If a star falls off the bottom of the canvas, reset it to the top
        // with a new random horizontal position to create a continuous loop.
        if (star.y > canvas.height) {
          star.y = 0; // Reset to the top edge
          star.x = Math.random() * canvas.width; // New random horizontal position
        }
      }

      // Request the next animation frame, creating a smooth animation loop
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation when the component mounts
    animate();

    // Cleanup function: This runs when the component unmounts
    return () => {
      // Remove the resize event listener to prevent memory leaks
      window.removeEventListener("resize", handleResize);
      // Cancel the animation frame to stop the animation loop
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <canvas
      ref={canvasRef}
      // Position the canvas absolutely to cover the entire background
      // Set zIndex to be behind your main content but above the main background div
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
};

export default CanvasBackground;
