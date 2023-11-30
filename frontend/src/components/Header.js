import React from "react";
import { useState } from "react";

function Header() {

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  function toggleOverlay() {
    setIsOverlayVisible(!isOverlayVisible);
  }

  return (
    <div className="header">
      <span className="radar-rewind">RadarRewind</span>
      <span className="about" onClick={toggleOverlay}>
        About
      </span>
      {isOverlayVisible && (
        <div className="overlay" onClick={toggleOverlay}>
          <p> Created by Kenny Brown</p>
          <a
            href="https://www.linkedin.com/in/kenny-brown-97b903112?trk=public_profile_browsemap"
            style={{ textDecoration: "none" }}
          >
            LinkedIn
          </a>
          <br></br>
          <a
            href="https://github.com/kenny150r"
            style={{ textDecoration: "none" }}
          >
            GitHub
          </a>
          <br></br>
          {/* <button >Close</button> */}
        </div>
      )}
    </div>
  );
}

export default Header;