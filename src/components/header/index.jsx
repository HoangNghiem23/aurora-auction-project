import React from 'react';
import './index.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="header-location-icon">📍</span>
        <nav className="header-nav">
          <a href="/jewelry">JEWELRY</a>
          <a href="/new-releases">NEW RELEASES</a>
          <a href="/gifts">GIFTS</a>
        </nav>
      </div>
      <div className="header-center">
        <h1 className="header-logo">APOLLONIAN</h1>
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search" className="header-search" />
        <span className="header-icon">🔍</span>
        <span className="header-icon">❤️</span>
        <span className="header-icon">🛒</span>
        <span className="header-icon">👤</span>
      </div>
    </header>
  );
};

export default Header;
