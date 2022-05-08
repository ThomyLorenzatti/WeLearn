import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Secret from './components/Secret/Secret.jsx';

function SecretPage() {
  return (
    <div>
      <Navbar />
      <Secret />
    </div>
  );
}

export default SecretPage;