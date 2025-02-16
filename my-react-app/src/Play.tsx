import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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

function Play() {
  return (
    <>
      <title>Navbar with p5.js Sketch</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
      <script src="../../backend/SaxophoneController/sketch.js"></script>

      <body>
        <NavBar />
        <div id="sketch-container"></div>
      </body>
    </>
  )
}

export default Play
