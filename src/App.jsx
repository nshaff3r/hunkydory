import React, { useEffect } from 'react'
import Home from './components/Home.jsx'
import Lenis from '@studio-freight/lenis'


export default function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

  }, []);
  return (
    <div className="relative w-screen min-h-screen bg-[#bedbff]">
      <Home />
    </div>
  )
}

