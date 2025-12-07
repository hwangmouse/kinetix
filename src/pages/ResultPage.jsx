// pages/ResultPage.jsx
// This page only renders the main result content.
// Header and Footer are expected to be rendered in App.jsx.

import React from "react";
import "./ResultPage.scss";

const ResultPage = () => {
  // Dummy data for now – you can wire this up to real API data later.
  const evaluationDate = "2025-12-04 19:12:54";
  const grade = "B+";
  const score = 87;

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

          {/* Overall grade + radar chart area */}
          <section className="result-card__section result-card__section--top">
            <div className="result-card__summary">
              <p className="result-card__label">Total Feedback</p>
              <p className="result-card__grade">{grade}</p>
              <p className="result-card__score">Score: {score}/100</p>
            </div>

            <div className="result-card__radar">
              <p className="result-card__sub-label">Kinematic Balance</p>
              <div className="result-card__radar-placeholder">
                {/* Radar chart placeholder */}
                Radar Chart Placeholder
              </div>
              <ul className="result-card__radar-legend">
                <li>Shoulder</li>
                <li>Elbow</li>
                <li>Trunk</li>
                <li>Pelvis</li>
                <li>Knee</li>
              </ul>
            </div>
          </section>

          {/* Quantitative data illustration */}
          <section className="result-card__section">
            <h2 className="result-card__section-title">Quantitative Data</h2>
            <div className="result-card__image-placeholder">
              {/* You can replace this with an actual image later */}
              <span>Pitching phase illustration (dummy)</span>
            </div>
          </section>

          {/* Graphical time–series data */}
          <section className="result-card__section">
            <h2 className="result-card__section-title">Graphical Data</h2>
            <div className="result-card__graph-placeholder">
              <span>Key joint loading graph (dummy)</span>
            </div>
          </section>

          {/* Skeleton playback */}
          <section className="result-card__section">
            <h2 className="result-card__section-title">Joint Skeleton Data</h2>
            <div className="result-card__skeleton-placeholder">
              <span>3D skeleton playback area (placeholder)</span>
            </div>
          </section>

          {/* Critical Zone clip */}
          <section className="result-card__section">
            <h2 className="result-card__section-title">Critical Zone</h2>
            <div className="result-card__critical">
              <div className="result-card__critical-thumb">
                <span>Critical frame</span>
              </div>

              <div className="result-card__critical-info">
                <p className="result-card__critical-title">84th Pitch</p>
                <p className="result-card__critical-meta">
                  90.6 mph · 146 cm from rubber
                </p>
                <ul className="result-card__critical-list">
                  <li>Peak elbow varus torque near late cocking.</li>
                  <li>Shoulder external rotation close to 180°.</li>
                  <li>Trunk rotation slightly delayed vs. pelvis.</li>
                </ul>
                <button
                  type="button"
                  className="result-card__link-button"
                >
                  View frame details →
                </button>
              </div>
            </div>
          </section>

          {/* Feedback list */}
          <section className="result-card__section">
            <h2 className="result-card__section-title">Quantitative Feedback</h2>
            <ol className="result-card__feedback-list">
              <li>
                <strong>Early pelvic opening</strong>
                <p>
                  Pelvis starts rotating about 12° earlier than the reference
                  group, which can increase elbow valgus load in late cocking.
                </p>
              </li>
              <li>
                <strong>High external rotation torque at MER</strong>
                <p>
                  Shoulder external rotation torque peaks near MER. Consider
                  improving scapular control and hip–shoulder separation timing.
                </p>
              </li>
              <li>
                <strong>Stride deficiency (&lt; 85% height)</strong>
                <p>
                  Short stride length may reduce energy transfer from lower
                  body and force more load into the throwing arm.
                </p>
              </li>
            </ol>
          </section>

          {/* Action buttons */}
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
    </main>
  );
};

export default ResultPage;
