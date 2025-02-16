import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import saxLogo from './assets/saximage2.webp'
//import viteLogo from '/vite.svg'
import './App.css'

function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  return (
    <>
    {/* <Route path="/tutorial" element={<tutorial />} />   */}
    <div className = "body" style={{ backgroundColor: 'blue'}}>
      <div className = "logo">
        <img src={saxLogo} alt="Saxaphone" />
      </div>
      <button className="option1" onClick={() => navigate('/Play')}>
          Play!
        </button>
        <button className="option2" onClick={() => navigate('/Tutorial')}>
          Tutorial
        </button>
        <button className="option3" onClick={() => navigate('/Settings')}>
          Settings
        </button>

      <h1 className = "title">Haxophone</h1>

        
        
    </div>
    </>
  )
}

export default Home
