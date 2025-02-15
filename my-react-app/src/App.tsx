import { useState } from 'react'
import reactLogo from './assets/react.svg'
import saxLogo from './assets/saximage2.webp'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "logo">
        <img src={saxLogo} alt="Saxaphone" />
      </div>
      <button className="option1" onClick={() => setCount((count) => count + 4)}>
          Play!
        </button>
        <button className="option2" onClick={() => setCount((count) => count + 2)}>
          Tutorial
        </button>
        <button className="option3" onClick={() => setCount((count) => count + 1)}>
          Settings
        </button>

      <h1 className = "title">Haxophone</h1>

        
        

    </>
  )
}

export default App
