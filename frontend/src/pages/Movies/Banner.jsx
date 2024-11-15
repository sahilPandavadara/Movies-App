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
  const autoScrollInterval = useRef(null);
  const slideRef = useRef(null);
  const lastInteractionTime = useRef(Date.now());

  useEffect(() => {
    setSlides([
      bannerImages[bannerImages.length - 1],
      ...bannerImages,
      bannerImages[0],
    ]);
  }, []);

  const startAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    autoScrollInterval.current = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime.current >= 7000) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 7000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, []);

  const handleSlideChange = (direction) => {
    if (isTransitioning) return;

    lastInteractionTime.current = Date.now();
    setIsTransitioning(true);

    if (direction === "next") {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => handleSlideChange("next");
  const handlePrev = () => handleSlideChange("prev");

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(bannerImages.length);
    } else if (currentIndex === bannerImages.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else {
      setIsTransitioning(false);
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ marginTop: "61px", height: "660px" }}
    >
      <div
        ref={slideRef}
        className="relative flex h-full w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-full w-full shrink-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="mb-4 text-4xl md:text-6xl font-bold text-white tracking-tight">
                {slide.text}
              </h1>
              {slide.id && (
                <a
                  href={`/movies/${slide.id}`}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-colors duration-300"
                >
                  See More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors duration-300 z-10"
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors duration-300 z-10"
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Banner;