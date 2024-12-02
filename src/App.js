// App.js
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Dashboard from './components/Dashboard';
import Blanko from "./components/Blanko_game";
import Memory from "./components/Memory_game";
import TTT from "./components/Tictactoe_game";
import HS from "./components/Hungrysnake_game";
import GN from "./components/Guessnumber_game";
import Puzzle from "./components/Puzzle_game";
import Tetris from "./components/Tetro_game";
import Mathgame from "./components/Randomoperator_game";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to="/dashboard" className="nav-item">
        <img src='https://gcore.jsdelivr.net/gh/stellariumImpl/CDN/pic/favicon.png' alt='logo' className="nav-logo"/>
      </Link>
      <Link to="/dashboard" className="nav-item">
        <span className='nav-text-long'>Dashboard</span>
        <span className='nav-text-short'>Da</span>
      </Link>
      <Link to="/game/blanko" className="nav-item">
        <span className='nav-text-long'>Blanko</span>
        <span className='nav-text-short'>BL</span>
      </Link>
      <Link to="/game/math" className="nav-item">
        <span className='nav-text-long'>Math</span>
        <span className='nav-text-short'>Ma</span>
      </Link>
      <Link to="/game/connect" className="nav-item">
        <span className='nav-text-long'>Connect 4</span>
        <span className='nav-text-short'>Co</span>
      </Link>
      <Link to="/game/memory" className="nav-item">
        <span className='nav-text-long'>Memorisation</span>
        <span className='nav-text-short'>Me</span>
      </Link>
      <Link to="/game/2048" className="nav-item">
        <span className='nav-text-long'>2048</span>
        <span className='nav-text-short'>2048</span>
      </Link>
      <Link to="/game/hungrysnake" className="nav-item">
        <span className='nav-text-long'>Hungrysnake</span>
        <span className='nav-text-short'>HS</span>
      </Link>
      <Link to="/game/guessnumber" className="nav-item">
        <span className='nav-text-long'>Guessnumber</span>
        <span className='nav-text-short'>GN</span>
      </Link>
      <Link to="/game/puzzle" className="nav-item">
        <span className='nav-text-long'>Puzzle</span>
        <span className='nav-text-short'>Pu</span>
      </Link>
      <Link to="/game/tetris" className="nav-item">
        <span className='nav-text-long'>Tetris</span>
        <span className='nav-text-short'>Te</span>
      </Link>
    </nav>
  );
}

function App() {
  return (
    <div className="body">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game/blanko" element={<Blanko />} />
          <Route path="/game/math" element={<Mathgame/>} />
          <Route path="/game/connect" element={<div>Connect 4</div>} />
          <Route path="/game/memory" element={<Memory/>} />
          <Route path="/game/2048" element={<TTT/>} />
          <Route path="/game/hungrysnake" element={<HS/>} />
          <Route path="/game/guessnumber" element={<GN/>} />
          <Route path="/game/puzzle" element={<Puzzle/>} />
          <Route path="/game/tetris" element={<Tetris/>} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
