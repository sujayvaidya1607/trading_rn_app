import React from "react";
import enterFullscreenIcon from "./Assets/Full screen.svg";
import exitFullscreenIcon from "./Assets/Fullscreen exit.svg";
const FullscreenToggle = ({ isFullscreen, toggleFullscreen }) => {
  return (
    <button
      className={isFullscreen ? "fullscreen-reset" : "fullscreen-toggle"}
      onClick={toggleFullscreen}
    >
      {isFullscreen ? (
        <img src={exitFullscreenIcon} alt="Exit Fullscreen" />
      ) : (
        <img src={enterFullscreenIcon} alt="Enter Fullscreen" />
      )}
    </button>
  );
};

export default FullscreenToggle;
