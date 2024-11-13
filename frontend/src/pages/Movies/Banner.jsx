import React, { useState } from "react";
import "../../CSS/Banner.css";

import banner from "../../assets/banner.jpg";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";

const bannerImages = [banner, img1, img2, img3, img4];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        style={{ backgroundImage: `url(${bannerImages[currentIndex]})` }}
      >
        <div className="banner-content">
          <h1>Venom: The Last Dance</h1>
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
