import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import MyCertificate from './components/MyCertificate/MyCertificate.jsx';

function MyCertificatePage() {
  return (
    <div class="form-div">
      <MyCertificate />
    </div>
  );
}

export default MyCertificatePage;