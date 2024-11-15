import React, { useState, useEffect, useRef } from "react";
import "../../CSS/Banner.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";

const bannerImages = [
  { image: img1, text: "The Wild Robot", id: "6734e849333089256fc61f6f" },
  {
    image: img2,
    text: "Venom: The Last Dance",
    id: "6734eaa03e0de084f30eb063",
  },
  { image: img3, text: "Terrifier3", id: "6734ed1d3e0de084f30eb064" },
  {
    image: img4,
    text: "Apocalypse Z: The Beginning of the End",
    id: "6735ea279a66842cd3a9382b",
  },
  { image: img5, text: "Deadpool & Wolverine", id: "6735cf6cf47052b2e784a17f" },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState([]);
  const autoScrollRef = useRef(null);
  const slideRef = useRef(null);
  const isMouseOver = useRef(false);

  // Initialize slides with cloned elements
  useEffect(() => {
    const initialSlides = [
      bannerImages[bannerImages.length - 1],
      ...bannerImages,
      bannerImages[0],
    ];
    setSlides(initialSlides);
  }, []);

  // Handle auto-scrolling
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }

      autoScrollRef.current = setInterval(() => {
        if (!isMouseOver.current) {
          handleSlideChange("next");
        }
      }, 5000); // Reduced interval to 5 seconds for better UX
    };

    // Start auto-scroll when component mounts
    startAutoScroll();

    // Cleanup interval on unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [currentIndex]); // Re-initialize interval when currentIndex changes

  const handleSlideChange = (direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (direction === "next") {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    // Reset to first slide
    if (currentIndex === bannerImages.length + 1) {
      setCurrentIndex(1);
    }
    // Reset to last slide
    else if (currentIndex === 0) {
      setCurrentIndex(bannerImages.length);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "660px", marginTop: "61px" }}
      onMouseEnter={() => {
        isMouseOver.current = true;
      }}
      onMouseLeave={() => {
        isMouseOver.current = false;
      }}
    >
      <div
        ref={slideRef}
        className="relative flex h-full w-full transform"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={`slide-${index}`}
            className="relative h-full w-full shrink-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center w-full max-w-4xl px-4">
              <h1 className="mb-6 text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                {slide.text}
              </h1>
              {slide.id && (
                <a
                  href={`/movies/${slide.id}`}
                  className="inline-flex items-center px-8 py-4 text-base font-medium text-black bg-white rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
                >
                  Explore Now
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => handleSlideChange("prev")}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-all duration-300 transform hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => handleSlideChange("next")}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-all duration-300 transform hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={`indicator-${index}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index + 1
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => {
              setCurrentIndex(index + 1);
              setIsTransitioning(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;