import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Content from './components/Content/Content.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Content />
    </Router>
  );
}

export default App;