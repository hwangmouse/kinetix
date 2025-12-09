import React, { useState } from "react";
import "./UploadPage.scss";

import leftPitchImg from "../assets/left_pitch.png";
import rightPitchImg from "../assets/right_pitch.png";

import rearPitchImg from "../assets/rear_pitching.png";
import sidePitchImg from "../assets/side_pitching.png";


const UploadPage = () => {
  const [pitchArm, setPitchArm] = useState("left"); // left | right

  // 메인 업로드(여러 개)
  const [rearFiles, setRearFiles] = useState([]); // File[]
  const [sideFiles, setSideFiles] = useState([]); // File[]

  // test video(1개만)
  const [testFiles, setTestFiles] = useState([]); // 길이 0 또는 1

  // 'rear' | 'side' | null
  const [activeAngle, setActiveAngle] = useState(null);

  // 드래그 상태 (간단하게 한 개만 관리)
  const [isDragging, setIsDragging] = useState(false);

  // 페이지 전체에서 파일 드롭시 기본 동작(파일 열기) 막기
  const preventDefaultDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // ======================
  // 메인 업로드( rear / side )
  // ======================

  const handleRearChange = (e) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("video/")
    );
    if (!files.length) return;
    setRearFiles((prev) => [...prev, ...files]);
  };

  const handleSideChange = (e) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("video/")
    );
    if (!files.length) return;
    setSideFiles((prev) => [...prev, ...files]);
  };

  const handleAngleToggle = (angle) => {
    if (activeAngle === angle) {
      // 같은 angle 다시 누르면 angle 초기화 + 메인 업로드 비우기 (기존 동작 유지)
      setActiveAngle(null);
      setRearFiles([]);
      setSideFiles([]);
    } else {
      setActiveAngle(angle);
    }
  };

  const handleMainDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleMainDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleMainDrop = (e, angle) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []).filter((file) =>
      file.type.startsWith("video/")
    );
    if (!files.length) return;

    if (angle === "rear") {
      setRearFiles((prev) => [...prev, ...files]);
    } else if (angle === "side") {
      setSideFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveRearFile = (index) => {
    setRearFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveSideFile = (index) => {
    setSideFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ======================
  // test video (1개 제한)
  // ======================

  const handleTestChange = (e) => {
    const file = Array.from(e.target.files || []).find((f) =>
      f.type.startsWith("video/")
    );
    if (!file) return;

    // 항상 한 개만 유지
    setTestFiles([file]);
  };

  const handleTestDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleTestDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleTestDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = Array.from(e.dataTransfer.files || []).find((f) =>
      f.type.startsWith("video/")
    );
    if (!file) return;

    setTestFiles([file]); // 항상 한 개만
  };

  const handleRemoveTestFile = () => {
    setTestFiles([]);
  };

  // ======================
  // Submit & 카운트
  // ======================
  const totalVideos = rearFiles.length + sideFiles.length;
  const hasEnoughMainVideos = totalVideos >= 10;
  const hasOneTestVideo = testFiles.length === 1;

  const isSubmitDisabled = !hasEnoughMainVideos || !hasOneTestVideo;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      pitchArm,
      rearFiles,
      sideFiles,
      testFiles,
      activeAngle,
    });
    // TODO: 실제 업로드 로직 연결
  };

  return (
    <main
      className="upload-page"
      onDragOver={preventDefaultDrop}
      onDrop={preventDefaultDrop}
    >
      <div className="upload-page__inner">
        <form className="upload-card" onSubmit={handleSubmit}>
          {/* Pitch Arm */}
          <div className="upload-card__section">
            <div className="upload-card__label">Choose Pitching Arm</div>

            <div className="upload-card__arm-buttons">
              {/* LEFT */}
              <button
                type="button"
                className={`upload-card__arm-button upload-card__arm-button--left ${
                  pitchArm === "left" ? "upload-card__arm-button--active" : ""
                }`}
                onClick={() => setPitchArm("left")}
              >
                <img
                  src={leftPitchImg}
                  alt="Left-handed pitcher"
                  className="upload-card__arm-image"
                />
                <div className="upload-card__arm-text">
                  LEFT-HANDED
                  <br />
                  PITCHER
                </div>
              </button>


              {/* RIGHT */}
              <button
                type="button"
                className={`upload-card__arm-button upload-card__arm-button--right ${
                  pitchArm === "right" ? "upload-card__arm-button--active" : ""
                }`}
                onClick={() => setPitchArm("right")}
              >
                <img
                  src={rightPitchImg}
                  alt="Right-handed pitcher"
                  className="upload-card__arm-image"
                />
                
                <div className="upload-card__arm-text">
                  RIGHT-HANDED
                  <br />
                  PITCHER
                </div>
              </button>
            </div>
          </div>

          {/* Camera Angle 선택 / 메인 업로드 */}
          <div className="upload-card__section">
            {activeAngle === null && (
              <>
                <div className="upload-card__label">Choose Camera Angle</div>

                <div className="upload-card__arm-buttons">
                  <button
                    type="button"
                    className="upload-card__arm-button"
                    onClick={() => handleAngleToggle("rear")}
                  >
                    <img
                      src={rearPitchImg}
                      alt="Rear view"
                      className="upload-card__angle-image"
                    />
                    <div className="upload-card__arm-text">
                      REAR
                      <br />
                      VIEW
                    </div>
                  </button>

                  <button
                    type="button"
                    className="upload-card__arm-button"
                    onClick={() => handleAngleToggle("side")}
                  >
                    <img
                      src={sidePitchImg}
                      alt="Side view"
                      className="upload-card__angle-image"
                    />
                    <div className="upload-card__arm-text">
                      SIDE
                      <br />
                      VIEW
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* REAR 선택 후 화면 */}
            {activeAngle === "rear" && (
              <>
                <button
                  type="button"
                  className="upload-card__label upload-card__label--toggle upload-card__label--active"
                  onClick={() => handleAngleToggle("rear")}
                >
                  {"<<  back (Choose Camera Angle)"}
                </button>

                <label
                  className={`upload-card__dropzone ${
                    isDragging ? "upload-card__dropzone--dragover" : ""
                  }`}
                  onDragOver={handleMainDragOver}
                  onDragLeave={handleMainDragLeave}
                  onDrop={(e) => handleMainDrop(e, "rear")}
                >
                  <input
                    className="upload-card__file-input"
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleRearChange}
                  />
                  <span className="upload-card__dropzone-text">
                    {isDragging ? "drop here!" : "Please upload at least 10 videos.\n\n(Click or Drop)"}
                  </span>
                </label>

                {rearFiles.length > 0 && (
                  <ul className="upload-card__file-list">
                    {rearFiles.map((file, index) => (
                      <li key={index} className="upload-card__file-item">
                        <span className="upload-card__file-name">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          className="upload-card__file-remove"
                          onClick={() => handleRemoveRearFile(index)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="upload-card__count-hint">
                  전체 업로드 영상 수: {totalVideos}
                </div>
              </>
            )}

            {/* SIDE 선택 후 화면 */}
            {activeAngle === "side" && (
              <>
                <button
                  type="button"
                  className="upload-card__label upload-card__label--toggle upload-card__label--active"
                  onClick={() => handleAngleToggle("side")}
                >
                  {"<<  back (Choose Camera Angle)"}
                </button>

                <label
                  className={`upload-card__dropzone ${
                    isDragging ? "upload-card__dropzone--dragover" : ""
                  }`}
                  onDragOver={handleMainDragOver}
                  onDragLeave={handleMainDragLeave}
                  onDrop={(e) => handleMainDrop(e, "side")}
                >
                  <input
                    className="upload-card__file-input"
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleSideChange}
                  />
                  <span className="upload-card__dropzone-text">
                    {isDragging ? "drop here!" : "Please upload at least 10 videos.\n\n(Click or Drop)"}
                  </span>
                </label>

                {sideFiles.length > 0 && (
                  <ul className="upload-card__file-list">
                    {sideFiles.map((file, index) => (
                      <li key={index} className="upload-card__file-item">
                        <span className="upload-card__file-name">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          className="upload-card__file-remove"
                          onClick={() => handleRemoveSideFile(index)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="upload-card__count-hint">
                  전체 업로드 영상 수: {totalVideos}
                </div>
              </>
            )}
          </div>

          {/* ===================== */}
          {/* test video 섹션 (1개) */}
          {/* ===================== */}
          <div className="upload-card__section">
            <div className="upload-card__label">test video</div>

            <label
              className={`upload-card__dropzone ${
                isDragging ? "upload-card__dropzone--dragover" : ""
              }`}
              onDragOver={handleTestDragOver}
              onDragLeave={handleTestDragLeave}
              onDrop={handleTestDrop}
            >
              <input
                className="upload-card__file-input"
                type="file"
                accept="video/*"
                onChange={handleTestChange}
              />
              <span className="upload-card__dropzone-text">
                {isDragging ? "drop here!" : "Please upload only 1 video.\n\n(Click or Drop)"}
              </span>
            </label>

            {testFiles.length > 0 && (
              <ul className="upload-card__file-list">
                <li className="upload-card__file-item">
                  <span className="upload-card__file-name">
                    {testFiles[0].name}
                  </span>
                  <button
                    type="button"
                    className="upload-card__file-remove"
                    onClick={handleRemoveTestFile}
                  >
                    X
                  </button>
                </li>
              </ul>
            )}

            <div className="upload-card__count-hint">
              test video 업로드: {testFiles.length} / 1
            </div>
          </div>

          {/* Submit */}
          <div className="upload-card__section upload-card__section--center">
            <button
              type="submit"
              className="upload-card__submit"
              disabled={isSubmitDisabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UploadPage;
