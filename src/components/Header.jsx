// components/Header.jsx
import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="pk-header">
      <div className="pk-header__inner">
        {/* Left side: logo */}
        <div className="pk-header__logo">
          {/* Simple text logo (replace with real image later) */}
          <span className="pk-header__logo-mark">PK</span>
          <span className="pk-header__logo-text">PitcherKinetiX</span>
        </div>

        {/* Right side: navigation menu */}
        <nav className="pk-header__nav">
          <button className="pk-header__nav-item">Pitching Tips</button>
          <button className="pk-header__nav-item pk-header__nav-item--active">
            Analyze
          </button>
          <button className="pk-header__nav-item">About</button>
          <button className="pk-header__nav-item">Archives</button>
          <button className="pk-header__nav-item">My</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
