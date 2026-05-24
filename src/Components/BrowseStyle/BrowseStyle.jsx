import React from "react";
import "./browseStyle.css";

const BrowseStyle = () => {
  return (
    <div className="browse">
      <div className="browse-container">
        <h2 className="heading">Shop Your Vibe</h2>
        <div className="box">
          <div
            className="img"
            style={{
              backgroundImage: `url("images/streetcore.png")`,
            }}
          ></div>
          <div
            className="img"
            style={{
              backgroundImage: `url("images/cleanit.png")`,
            }}
          ></div>
        </div>
        <div className="middle-box">          
          <div
            className="img"
            style={{
              backgroundImage: `url("images/mainch1.png")`,
            }}
          ></div></div>
        <div className="box">
          <div
            className="img"
            style={{
              backgroundImage: `url("images/darkmode.png")`,
            }}
          ></div>
          <div
            className="img"
            style={{
              backgroundImage: `url("images/mainch1.png")`,
            }}
          ></div>
        </div>
        <div className="browse-grid">
        </div>
      </div>
    </div>
  );
};

export default BrowseStyle;