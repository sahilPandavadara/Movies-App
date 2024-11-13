import React from "react";
import "../../CSS/About.css";
import aboutImg from "../../assets/aboutImage.jpg"; 
import Footer from "./Footer";

const About = () => {
  return (
    <div className="about-container">
      <img src={aboutImg} alt="About Us" className="about-image" />
      <div className="about-text">About Us</div>

      <div>
        <p>Welcome To </p>
        <p>PlayBox Movie Platform</p>
        <p>
          We're passionate about bringing you the best entertainment experience
          right at your fingertips. Our goal is to provide you with a platform
          that offers a vast collection of movies, TV shows, and documentaries.
        </p>
          </div>
        <Footer />
    </div>
  );
};

export default About;
