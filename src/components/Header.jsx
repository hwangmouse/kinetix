import React from 'react';
import './header.scss';
import logo from '../assets/logo.png';
const Header = () => {
  // 현재 활성화된 메뉴를 시뮬레이션하기 위해 변수 설정 (나중에 props나 라우터로 변경 가능)
  const activeMenu = 'Analyze';

  const menuItems = [
    { name: 'Pitching Tips', link: '#tips' },
    { name: 'Analyze', link: '#analyze' },
    { name: 'About', link: '#about' },
    { name: 'Archives', link: '#archives' },
    { name: 'My', link: '#my' },
  ];

  return (
    <header className="header-container">
      <div className="logo-wrapper">
        <img src={logo} alt="PitcherKinetiX Logo" />
        <span className="brand-name">PitcherKinetiX</span>
      </div>
      
      <nav className="nav-bar">
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item.name} 
              className={activeMenu === item.name ? 'active' : ''}
            >
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;