import React, { useEffect, useRef, useState } from "react";
import "../style.css";
import Img1 from "../assests/img1.jpg";
import Img2 from "../assests/img2.jpg";
import Img3 from "../assests/img3.jpg";
import Img4 from "../assests/img4.jpg";
import Img5 from "../assests/img5.jpg";
import Img6 from "../assests/img6.jpg";
import Temple1 from "../assests/temple1.jpeg";

const images = [Img1, Img2, Img3, Img4, Img5, Img6, Temple1];

export default function AdvancedInfiniteSlider() {
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    if (isHovered) {
      return undefined;
    }

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    if (index === images.length + 1) {
      const timeout = setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 600);

      return () => clearTimeout(timeout);
    }

    if (index === 0) {
      const timeout = setTimeout(() => {
        setTransition(false);
        setIndex(images.length);
      }, 600);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [index]);

  useEffect(() => {
    if (!transition) {
      const timeout = setTimeout(() => setTransition(true), 50);
      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [transition]);

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const diff = touchStartX.current - event.changedTouches[0].clientX;

    if (diff > 50) {
      next();
    }

    if (diff < -50) {
      prev();
    }
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
        {extendedImages.map((img, slideIndex) => (
          <div key={slideIndex} className="slide">
            <img
              src={img}
              alt={`Temple gallery slide ${slideIndex + 1}`}
              className="slide-image"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="arrow left"
        aria-label="Previous slide"
        onClick={prev}
      >
        ‹
      </button>
      <button
        type="button"
        className="arrow right"
        aria-label="Next slide"
        onClick={next}
      >
        ›
      </button>

      <div className="dots">
        {images.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            className={`dot ${index - 1 === dotIndex ? "active-dot" : ""}`}
            aria-label={`Go to slide ${dotIndex + 1}`}
            onClick={() => setIndex(dotIndex + 1)}
          />
        ))}
      </div>
    </div>
  );
}
