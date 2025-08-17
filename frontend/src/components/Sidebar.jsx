import React from 'react';
import '../styles/Sidebar.css';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">MyPortfolio</h2>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
