import React from "react";
import background from "../assets/background.mp4";
import "../styles/Section.css";

const Section = ({ children }) => {
  return (
    <div className="section">
      <video src={background} autoPlay loop muted className="video" />
      <div className="content">{children}</div>
    </div>
  );
};

export default Section;
