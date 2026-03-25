import React, { useState, useEffect } from "react";

const slides = [
  "https://picsum.photos/1200/600?random=1",
  "https://picsum.photos/1200/600?random=2",
  "https://picsum.photos/1200/600?random=3",
  "https://picsum.photos/1200/600?random=4",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images
  useEffect(() => {
    slides.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Change slide every 1.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[45vh] md:h-[50vh] overflow-hidden">
      {slides.map((url, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-100 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={url}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover aspect-video p-1"
          />
        </div>
      ))}
    </div>
  );
};

export default Hero;