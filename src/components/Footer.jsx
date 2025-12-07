// components/Footer.jsx
import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="pk-footer">
      <div className="pk-footer__inner">
        {/* Top small line text */}
        <p className="pk-footer__small-text">
          A CLOSER LOOK TO LEARN MORE ABOUT PITCHING PROGRAMS
        </p>

        {/* Center copyright block (simplified) */}
        <p className="pk-footer__main-text">
          COPYRIGHT © PITCHERKINETIX. ALL RIGHTS RESERVED. THIS SERVICE IS FOR
          EDUCATIONAL AND TRAINING PURPOSES ONLY AND DOES NOT REPLACE
          PROFESSIONAL MEDICAL CARE.
        </p>

        {/* Bottom tiny disclaimer */}
        <p className="pk-footer__tiny-text">
          This material is for general informational use and is not intended to
          provide medical advice. Always consult professionals for injury
          prevention and treatment.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
