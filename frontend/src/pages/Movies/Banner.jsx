import React, { useState, useEffect } from "react";
import "../../CSS/Banner.css";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";

const bannerImages = [
  { image: img1, text: "The Wild Robot" },
  { image: img2, text: "Venom: The Last Dance" },
  { image: img3, text: "Terrifier3" },
  { image: img4, text: "Apocalypse Z: The Beginning of the End" },
  { image: img5, text: "Deadpool & Wolverine" },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
     }, 8000); // 1000ms = 1 seconds
     return () => clearInterval(interval); // Cleanup on component unmount
   }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length
    );
  };

  return (
    <div className="banner">
      <div
        className="banner-slide"
        style={{ backgroundImage: `url(${bannerImages[currentIndex].image})` }}
      >
        <div className="banner-content">
          <h1>{bannerImages[currentIndex].text}</h1>
          <div className="banner-buttons">
            <button className="banner-button">See More</button>
            <button className="banner-button">Play</button>
          </div>
        </div>
      </div>

      <button className="banner-arrow left" onClick={handlePrev}>
        &#9664;
      </button>
      <button className="banner-arrow right" onClick={handleNext}>
        &#9654;
      </button>
    </div>
  );
};

export default Banner;
