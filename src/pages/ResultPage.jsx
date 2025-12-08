import React, { useRef, useState } from "react";
import "./ResultPage.scss";
import poseImg from "../assets/pose.png";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceArea,
  BarChart,
  Bar,
  Cell,
  ReferenceLine
} from "recharts";
import skeletonVideo from "../assets/skeleton.mp4";
import criticalJointImg from "../assets/criticalJointImg.png"; // 파일 이름에 맞게 수정

const ResultPage = () => {
  // Dummy evaluation data
  const evaluationDate = "2025-12-10\u00A0\u00A0\u00A019:12:54";
  const grade = "B+"; //A+ A- B+ B- C+ C- D+ D- F
  const score = 73.9;

  // Dummy radar data (5 metrics -> pentagon)
  const radarData = [
    { metric: "Knee Ext", value: 60 },
    { metric: "Pelvis Rot", value: 100 },
    { metric: "Trunk Rot", value: 60 },
    { metric: "Elbow Ext", value: 100 },    
    { metric: "Shoulder IR", value: 100 }
  ];

    // 각 phase 이름만 따로 배열로 정의
    const phases = [
    "Lead Knee Extention",
    "Pelvic Rotation",
    "Trunk Rotation",
    "Elbow Extension",
    "Shoulder Internal Rotation",
    ];

    // 레이더 value를 phase 순서에 맞춰서 1개의 y값으로 매핑
    const graphData = phases.map((phase, idx) => ({
    phase,
    load: radarData[idx]?.value ?? 0, // value 없으면 0
    }));

  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const [isCriticalOpen, setIsCriticalOpen] = useState(false);

  // Joint error data mapped to body positions (for overlay on pose.png)
  const jointErrorMap = [
    {
      id: "L_elbow_angle",
      label: "L Elbow",
      status: "warning", // "warning" or "normal"
      err: 0.1306,
      top: "35%",
      left: "40%",
    },
    {
      id: "R_elbow_angle",
      label: "R Elbow",
      status: "normal",
      err: 0.0431,
      top: "38%",
      left: "75%",
    },
    {
      id: "L_shoulder_angle",
      label: "L Shoulder",
      status: "normal",
      err: 0.0431,
      top: "18%",
      left: "40%",
    },
    {
      id: "R_shoulder_angle",
      label: "R Shoulder",
      status: "normal",
      err: 0.0353,
      top: "20%",
      left: "68%",
    },
    {
      id: "trunk_rot_vel",
      label: "Trunk",
      status: "normal",
      err: 0.0292,
      top: "48%",
      left: "60%",
    },
    {
      id: "pelvis_rot_vel",
      label: "Pelvis",
      status: "normal",
      err: 0.0428,
      top: "65%",
      left: "68%",
    },
    {
      id: "L_knee_angle",
      label: "L Knee",
      status: "normal",
      err: 0.018,
      top: "80%",
      left: "25%",
    },
    {
      id: "R_knee_angle",
      label: "R Knee",
      status: "normal",
      err: 0.0365,
      top: "85%",
      left: "78%",
    },
  ];

  // [2] General Model comparison (err vs population)
  const worstGeneralFeature = "L_shoulder_angle";

  const generalComparisonData = [
    { key: "L_elbow_angle", label: "L Elbow angle", err: 0.9727 },
    { key: "R_elbow_angle", label: "R Elbow angle", err: 0.9497 },
    { key: "L_shoulder_angle", label: "L Shoulder angle", err: 1.5806 },
    { key: "R_shoulder_angle", label: "R Shoulder angle", err: 1.3705 },
    { key: "L_hip_angle", label: "L Hip angle", err: 0.7179 },
    { key: "R_hip_angle", label: "R Hip angle", err: 0.8520 },
    { key: "L_knee_angle", label: "L Knee angle", err: 0.4452 },
    { key: "R_knee_angle", label: "R Knee angle", err: 0.7675 },
    { key: "knee_ext_vel", label: "Knee ext. vel", err: 1.2445 },
    { key: "pelvis_rot_vel", label: "Pelvis rot. vel", err: 1.1803 },
    { key: "trunk_rot_vel", label: "Trunk rot. vel", err: 0.5047 },
    { key: "elbow_ext_vel", label: "Elbow ext. vel", err: 0.8753 },
    { key: "shoulder_ir_vel", label: "Shoulder IR vel", err: 0.7335 },
  ];

  const generalSimilarityScore = 51.5;
  const latentShiftNorm = 0.6645;

  return (
    <main className="result-page">
      <div className="result-page__inner">
        <section className="result-card">
          {/* Title + timestamp */}
          <header className="result-card__header">
            <div className="result-card__title-row">
              <h1 className="result-card__title">Injury Risk Evaluation</h1>
              <button
                type="button"
                className="result-card__title-edit"
                aria-label="Edit title"
              >
                ✎
              </button>
            </div>
            <p className="result-card__timestamp">{evaluationDate}</p>
          </header>


          {/* Overall grade + radar chart */}
          <section className="result-card__section result-card__section--top">
            {/* Summary area */}
            <p className="result-card__section-title--top">
                Total Feedback
            </p>
            <div className="result-card__top-wrapper">
            <div className="result-card__summary">
              <p className="result-card__grade">{grade}</p>
              <p className="result-card__score">Score: {score}/100</p>
            </div>

            {/* Radar chart area */}
            <div className="result-card__radar">

              <div className="result-card__radar-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={radarData}
                    outerRadius="70%"
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    {/* <PolarRadiusAxis
                      tickCount={5}
                      axisLine={false}
                      tick={{ fontSize: 10 }}
                    /> */}
                    <Tooltip
                        formatter={(value) => `${value} / 100`}   // 값 표시 형식
                        labelFormatter={(label) => `Metric: ${label}`} // 축 이름 표시 형식
                        contentStyle={{
                            fontSize: 12,
                            padding: "6px 8px",
                        }}
                    />
                    <Radar
                      name="Pitcher"
                      dataKey="value"
                      stroke="#0082ff"
                      fill="#0082ff"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            </div>
          </section>

          {/* Quantitative data */}
        <section className="result-card__section">
          <h2 className="result-card__section-title">User Pitching Reconstruction Error Analysis</h2>

          <div className="result-card__quant">
            {/* Left: body map with arrows/labels */}
            <div className="result-card__body-map">
              <img
                src={poseImg}
                alt="Pitching pose"
                className="result-card__body-image"
              />

              {jointErrorMap.map((joint) => (
                <button
                  key={joint.id}
                  type="button"
                  className={`body-marker body-marker--${joint.status}`}
                  style={{ top: joint.top, left: joint.left }}
                  title={`${joint.label}: ${joint.status === "warning" ? "주의" : "정상"} (err=${joint.err.toFixed(4)})`}
                >
                  <span className="body-marker__dot" />
                  <span className="body-marker__label">
                    {joint.label}
                    <span className="body-marker__err">
                      err={joint.err.toFixed(4)}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Right: text values */}
            <div className="result-card__quant-text">
              {[
                "L_elbow_angle: 주의 (err=0.1306)",
                "R_elbow_angle: 정상 (err=0.0431)",
                "L_shoulder_angle: 정상 (err=0.0431)",
                "R_shoulder_angle: 정상 (err=0.0353)",
                "L_hip_angle: 정상 (err=0.0191)",
                "R_hip_angle: 정상 (err=0.0322)",
                "L_knee_angle: 정상 (err=0.0180)",
                "R_knee_angle: 정상 (err=0.0365)",
                "knee_ext_vel: 정상 (err=0.0323)",
                "pelvis_rot_vel: 정상 (err=0.0428)",
                "trunk_rot_vel: 정상 (err=0.0292)",
                "elbow_ext_vel: 정상 (err=0.0467)",
                "shoulder_ir_vel: 정상 (err=0.0276)",
              ].map((item, index) => (
                <div
                  key={index}
                  className={`result-card__quant-block ${
                    item.includes("주의") ? "warning-text" : "safe-text"
                  }`}
                >
                  <h3 className="result-card__quant-heading">{item}</h3>
                </div>
              ))}
            </div>
        </div>
        </section>

        {/* General model comparison */}
        <section className="result-card__section">
          <div className="result-card__section-header">
            <h2 className="result-card__section-title">General Model Comparison</h2>
            <span className="result-card__score-tag">
              General Similarity Score: <b>{generalSimilarityScore}</b>
            </span>
          </div>

          <div className="general-section">
            {/* Left: horizontal bar chart */}
            <div className="general-section__chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={generalComparisonData}
                  layout="vertical"
                  margin={{ top: 10, right: 10, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11 }}
                    label={{
                      value: "Error vs. population (AE)",
                      position: "insideBottom",
                      offset: -2,
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    width={120}
                  />
                  <Tooltip
                    formatter={(value) => [`err=${Number(value).toFixed(4)}`, "Feature"]}
                    labelFormatter={(label) => label}
                  />
                  <Bar dataKey="err" radius={[0, 4, 4, 0]}>
                    {generalComparisonData.map((entry, index) => (
                      <Cell
                        key={entry.key}
                        fill={
                          entry.key === worstGeneralFeature ? "#d62828" : "#0f73c9"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Right: summary text */}
            <div className="general-section__summary">
              <p className="general-section__metric">
                Worst General Feature: <b>{worstGeneralFeature}</b>
              </p>
              <p className="general-section__metric">
                Latent Shift Norm: <b>{latentShiftNorm}</b>
              </p>
              <p className="general-section__note">
                • The bar length represents the magnitude of error compared to pitchers in the same position. 
                A longer bar indicates a greater deviation from typical pitching patterns.
                <br /><br />
                • The largest deviation was observed in <b>{worstGeneralFeature}</b>, suggesting that your shoulder–hip kinetic chain usage differs from the group average.
                <br /><br />
                • With a General Similarity Score of 51.5, your motion demonstrates a <b>moderate level of similarity</b> compared to the reference population.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Comparison Visualization */}
        <section className="general-extra-section">
          <div className="general-extra-container">

            {/* Left Image */}
            <div className="general-extra-block">
              <img
                src="src/assets/shoulderGraph.png"
                alt="Reference Model Left"
                className="general-extra-image"
              />
            </div>

            {/* Right Image */}
            <div className="general-extra-block">
              <img
                src="src/assets/framelevel.png"
                alt="Your Motion"
                className="general-extra-image2"
              />
            </div>
          </div>
        </section>
        <section className="general-extra-explain-section">
          <p>
            The graph on the left compares your <b>left shoulder kinematic pattern</b> 
            (green line) against the general reference motion (orange line). While both 
            follow a similar sequence early in the delivery, your motion shows a 
            noticeably <b>steeper rise</b> in angular position and an earlier peak, 
            suggesting a more aggressive shoulder contribution during arm-cocking. 
            This pattern may increase ball speed potential, but may also elevate 
            <b> rotational stress</b> if not synchronized with trunk and hip timing.
          </p>

          <p>
            The right graph shows the <b>frame-level reconstruction error</b> across your 
            motion. Lower values indicate movements aligned closely with the reference 
            mechanics, while higher values reveal <b>critical phases where motion 
            deviates</b> or compensation patterns occur. In your sequence, error values 
            remain relatively low during the early kinematic phases, but rise sharply 
            near key acceleration frames—and again toward the late follow-through 
            phase—indicating potential timing mismatches in shoulder rotation or 
            sequencing with the kinetic chain.
          </p>
        </section>

        {/* Graphical data */}
        <section className="result-card__section">
        <div className="result-card__section-header">
          <h2 className="result-card__section-title">Medical Graphical Data</h2>
          <span className="result-card__score-tag">
            Medical Safety Score: <b>74.4</b>
          </span>
        </div>

        <div className="result-card__graph-box">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={graphData}
                margin={{ top: 10, right: 40, left: 40, bottom: 50 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="phase"
                  tick={{ fontSize: 11 }}
                  interval={0}                // 모든 라벨 표시
                  angle={-20}                 // 살짝 기울여서 겹침 방지
                  textAnchor="end"
                  tickMargin={12}             // 축과 글자 사이 여유
                  padding={{ left: 20, right: 20 }} // 🔥 양끝 라벨 안쪽으로 당김
                />
                <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11 }}
                />

                {/* Tooltip */}
                <Tooltip
                formatter={(value) => [`${value}%`, "Load"]}
                labelFormatter={(label) => `Phase: ${label}`}
                />

                <ReferenceArea y1={0} y2={50} fill="rgba(255, 87, 87, 0.18)" />
                <ReferenceArea y1={50} y2={75} fill="rgba(255, 196, 0, 0.12)" />
                <ReferenceArea y1={75} y2={100} fill="rgba(0, 200, 83, 0.12)" />

                <ReferenceLine
                  y={50}
                  stroke="#d62828"
                  strokeDasharray="4 4"
                  label="⚠ High Injury Risk"
                />

                <ReferenceLine
                  y={75}
                  stroke="#f4a300"
                  strokeDasharray="4 4"
                  label="Moderate Risk"
                />

                {/* 직선 형태의 Line (곡선 X) */}
                <Line
                type="linear"
                dataKey="load"
                name="Kinematic Score"
                stroke="#007bff"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
        </section>

        {/* Skeleton data */}
        <section className="result-card__section">
          <h2 className="result-card__section-title">Joint Skeleton Data</h2>

          <div className="result-card__skeleton-layout">
            {/* Left: video + 3D overlay canvas */}
            <div className="result-card__video-wrapper">
              <div className="result-card__video-stack">
                <video
                  ref={videoRef}
                  src={skeletonVideo}
                  className="result-card__video"
                  controls
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                />

                {/* 3D overlay canvas placeholder */}
                <canvas
                  className="result-card__overlay-canvas"
                  // TODO: Attach Three.js renderer or pose overlay here
                />
                <span className="result-card__overlay-label">
                  2D Pose Overlay
                </span>
              </div>
            </div>

            {/* Right: controls & meta info */}
            <div className="result-card__skeleton-side">
              <h3 className="result-card__skeleton-heading">Playback Controls</h3>
              <div className="result-card__speed-buttons">
                <button
                  type="button"
                  className={
                    playbackRate === 0.5
                      ? "result-card__speed-btn result-card__speed-btn--active"
                      : "result-card__speed-btn"
                  }
                  onClick={() => handleSpeedChange(0.5)}
                >
                  0.5×
                </button>
                <button
                  type="button"
                  className={
                    playbackRate === 1
                      ? "result-card__speed-btn result-card__speed-btn--active"
                      : "result-card__speed-btn"
                  }
                  onClick={() => handleSpeedChange(1)}
                >
                  1.0×
                </button>
                <button
                  type="button"
                  className={
                    playbackRate === 2
                      ? "result-card__speed-btn result-card__speed-btn--active"
                      : "result-card__speed-btn"
                  }
                  onClick={() => handleSpeedChange(2)}
                >
                  2.0×
                </button>
              </div>

              <div className="result-card__skeleton-meta">
                <p className="result-card__skeleton-label">Key Phases</p>
                <ul className="result-card__key-list">
                  <li>Elbow Angle</li>
                  <li>Shoulder Angle</li>
                  <li>Hip Angle</li>
                  <li>Knee Angle</li>
                  <li>Upper Rotation Velocity</li>
                  <li>Knee, Elbow Extension Velocity</li>
                  <li>Shoulder Internal Velocity</li>
                </ul>

                <p className="result-card__skeleton-hint">
                  • Visualizes joint movement, angles, and velocity profiles to support 
                  detailed pitching motion analysis and performance comparison. <br />
                  • Red markers indicate greater deviation from normal mechanics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Critical zone */}
        <section className="result-card__section">
          <div className="result-card__section-header">
            <h2 className="result-card__section-title">Critical Zone</h2>
          </div>

          <div className="critical-joint">
            {/* Left: joint image */}
            <div className="critical-joint__image-box">
              <img
                src={criticalJointImg}
                alt="Critical joint illustration"
                className="critical-joint__image"
              />
              <span className="critical-joint__badge">Knee Extension</span>
            </div>

            {/* Right: explanation */}
            <div className="critical-joint__info">
              <p className="critical-joint__title">
                Primary Critical Feature:
                <span className="keyword-highlight">Knee Extension Velocity</span>
              </p>
              <ul className="critical-joint__list">
                <li>
                  Based on pitching biomechanics literature, optimal lead-leg extension typically
                  occurs around <b>70–90% of the delivery phase</b>, with rapid knee extension
                  velocity contributing to improved trunk angular velocity, energy transfer,
                  and ball speed. Insufficient or late extension may lead to early pelvis rotation, 
                  reduced trunk–hip separation, and increased stress on upper-extremity joints.
                </li>
                <li>
                  Regular monitoring of <b>weight-shift timing, hip rotation range, and lead-leg 
                  extension velocity</b> is recommended to prevent fatigue-related compensations 
                  and overuse-related mechanical breakdowns, particularly during high pitch 
                  volume or late-game fatigue phases.
                </li>
              </ul>
            </div>
          </div>
        </section>

          {/* Feedback */}
          <section className="result-card__section">
            <h2 className="result-card__section-title">Quantitative Feedback</h2>
            <ol className="result-card__feedback-list">

              <li>
                <strong>Key biomechanical inconsistencies</strong>
                <p>
                  Lower-body mechanics show variability, especially in the right hip and knee angles, indicating an unstable base in
                  the kinetic chain. The left elbow angle deviation may also reflect imbalance or compensatory upper-body motion.
                </p>
              </li>

              <li>
                <strong>Suboptimal kinematic sequencing</strong>
                <p>
                  Your Medical Safety Score (74.4) and Timing Score (60) suggest your motion may not consistently follow the optimal
                  pitching sequence: lead knee extension → pelvis rotation → trunk rotation → elbow extension → shoulder internal rotation. According to clinical
                  biomechanics research, disruption in this sequence increases stress on the shoulder and elbow and reduces force
                  transfer efficiency.
                </p>
              </li>

              <li>
                <strong>Increased upper-extremity workload risk</strong>
                <p>
                  When the lower body fails to initiate and stabilize rotation effectively, the upper body compensates. This can result
                  in increased valgus stress on the elbow, elevated internal rotation torque at the shoulder, and reduced pitching
                  efficiency. Efficient pitchers generate momentum from the ground up — not solely from the arm.
                </p>
              </li>

              <li>
                <strong>Lower-body corrective focus recommended</strong>
                <p>
                  Improving hip stability, stride mechanics, and timing will support more efficient energy transfer. Recommended
                  corrective strategies include:
                </p>
                <ul className="result-card__list-sub">
                  <li>Hip mobility circuits and rotational lunges for mobility and stability.</li>
                  <li>Split squats, single-leg deadlifts, and med-ball rotational drills for power drive.</li>
                  <li>Shadow pitching with “pelvis-first” focus to reinforce sequence consistency.</li>
                </ul>
              </li>

              <li>
                <strong>Arm mechanics refinement</strong>
                <p>
                  Since elbow variability exists, ensure the arm follows—not leads—the rotational sequence. Slow-motion shadow work
                  and mirror-based drills can reinforce proper movement timing, using the cue: <em>"Hips fire first, arm comes last."</em>
                </p>
              </li>

              <li>
                <strong>Progressive workload progression</strong>
                <p>
                  Mechanical changes should be introduced gradually. Begin with short-distance throws, progress to flat-ground mechanics,
                  and only then advance to full-intensity mound work.
                </p>
              </li>

              <li>
                <strong>Overall interpretation</strong>
                <p>
                  Your motion is already highly consistent (User Consistency Score: 95.9), indicating repeatable patterns — a strong
                  foundation. The key opportunity now is optimizing efficiency and reducing injury risk by refining lower-body mechanics
                  and sequencing. Improving these elements is likely to raise your medical score, enhance performance, and reduce
                  cumulative stress on the throwing arm.
                </p>
              </li>

            </ol>
          </section>

          {/* Buttons */}
          <section className="result-card__section result-card__section--buttons">
            <button type="button" className="result-card__primary-btn">
              Save in Archive
            </button>
            <button type="button" className="result-card__secondary-btn">
              Export to PDF
            </button>
          </section>
        </section>
      </div>

      {isCriticalOpen && (
        <div
          className="critical-modal__backdrop"
          onClick={() => setIsCriticalOpen(false)}
        >
          <div
            className="critical-modal__content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              type="button"
              className="critical-modal__close"
              onClick={() => setIsCriticalOpen(false)}
            >
              ✕
            </button>

            <h3 className="critical-modal__title">Critical Frame Playback</h3>
            <video
              src={criticalVideo}
              className="critical-modal__video"
              controls
              autoPlay
              loop
              muted
              playsInline
            />
            <p className="critical-modal__caption">
              84th pitch – high elbow varus torque at late cocking.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ResultPage;
