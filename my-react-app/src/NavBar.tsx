import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import saxLogo1 from '../../Mockups/SaxBlackWhite.png'
import './Play.css'

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo1">
        <Link to = "/">
        <img src={saxLogo1} alt="Saxaphone" />
        </Link>

      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Tutorial">Tutorial</Link></li>
        <li><Link to="/Settings">Settings</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;