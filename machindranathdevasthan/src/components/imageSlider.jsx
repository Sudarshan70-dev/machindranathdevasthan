import React, { useEffect, useState, useRef } from "react";
import "../style.css";
import Img1 from "../assests/img1.jpg";
import Img2 from "../assests/img2.jpg";
import Img3 from "../assests/img3.jpg";
import Img4 from "../assests/img4.jpg";
import Img5 from "../assests/img5.jpg";
import Img6 from "../assests/img6.jpg";
const images = [
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6
];

export default function AdvancedInfiniteSlider() {
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(null);

  const extendedImages = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  // Auto Slide
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Infinite Logic
  useEffect(() => {
    if (index === images.length + 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 600);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(images.length);
      }, 600);
    }
  }, [index]);

  useEffect(() => {
    if (!transition) {
      setTimeout(() => setTransition(true), 50);
    }
  }, [transition]);

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  // Swipe Support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  return (
    <div
      className="slider-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transition ? "transform 0.6s ease-in-out" : "none",
        }}
      >
        {extendedImages.map((img, i) => (
          <div
            key={i}
            className="slide"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      {/* Arrows */}
      <button className="arrow left" onClick={prev}>❮</button>
      <button className="arrow right" onClick={next}>❯</button>

      {/* Dots */}
      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${index - 1 === i ? "active-dot" : ""}`}
            onClick={() => setIndex(i + 1)}
          ></span>
        ))}
      </div>
    </div>
  );
}