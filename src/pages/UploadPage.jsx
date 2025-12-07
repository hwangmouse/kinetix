// pages/UploadPage.jsx
import React, { useState } from "react";
import "./UploadPage.scss";

const UploadPage = () => {
  // Simple state to highlight which pitcher arm is selected
  const [arm, setArm] = useState("left"); // "left" or "right"

  // File state (you can connect to backend later)
  const [rearFileName, setRearFileName] = useState("");
  const [sideFileName, setSideFileName] = useState("");

  // Handle rear view file upload
  const handleRearChange = (e) => {
    // Just store file name for UI
    const file = e.target.files?.[0];
    if (file) {
      setRearFileName(file.name);
    }
  };

  // Handle side view file upload
  const handleSideChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSideFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend upload / analysis API
    console.log("Selected arm:", arm);
    console.log("Rear file:", rearFileName);
    console.log("Side file:", sideFileName);
    alert("Upload submit clicked (connect to backend later).");
  };

  return (
    <main className="upload-page">
      <div className="upload-page__inner">
        <form className="upload-card" onSubmit={handleSubmit}>
          {/* Choose pitching arm */}
          <div className="upload-card__section">
            <p className="upload-card__label">Choose Pitching Arm</p>

            <div className="upload-card__arm-buttons">
              <button
                type="button"
                className={
                  arm === "left"
                    ? "upload-card__arm-button upload-card__arm-button--active"
                    : "upload-card__arm-button"
                }
                onClick={() => setArm("left")}
              >
                <span className="upload-card__arm-icon">⚾</span>
                <span className="upload-card__arm-text">
                  LEFT-HANDED
                  <br />
                  PITCHER
                </span>
              </button>

              <button
                type="button"
                className={
                  arm === "right"
                    ? "upload-card__arm-button upload-card__arm-button--active"
                    : "upload-card__arm-button"
                }
                onClick={() => setArm("right")}
              >
                <span className="upload-card__arm-icon">⚾</span>
                <span className="upload-card__arm-text">
                  RIGHT-HANDED
                  <br />
                  PITCHER
                </span>
              </button>
            </div>
          </div>

          {/* Rear view upload */}
          <div className="upload-card__section">
            <p className="upload-card__sub-label">Camera Angle: REAR VIEW</p>
            <label className="upload-card__dropzone">
              <input
                type="file"
                accept="video/*"
                onChange={handleRearChange}
                className="upload-card__file-input"
              />
              <span className="upload-card__dropzone-text">
                {rearFileName || "Upload"}
              </span>
            </label>
          </div>

          {/* Side view upload */}
          <div className="upload-card__section">
            <p className="upload-card__sub-label">Camera Angle: SIDE VIEW</p>
            <label className="upload-card__dropzone">
              <input
                type="file"
                accept="video/*"
                onChange={handleSideChange}
                className="upload-card__file-input"
              />
              <span className="upload-card__dropzone-text">
                {sideFileName || "Upload"}
              </span>
            </label>
          </div>

          {/* Submit button */}
          <div className="upload-card__section upload-card__section--center">
            <button type="submit" className="upload-card__submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UploadPage;
