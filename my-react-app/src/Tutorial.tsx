import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import saxLogo from './assets/saximage2.webp'
//import viteLogo from '/vite.svg'
import './App.css'

function Tutorial() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  return (
    <>
        <h1>Tutorial</h1>
    </>
  )
}

export default Tutorial
