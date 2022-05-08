import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Formations from './components/Formations/Formations.jsx';

function Formation() {
  return (
    <div>
      <Navbar />
      <Formations />
    </div>
  );
}

export default Formation;