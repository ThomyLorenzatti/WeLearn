import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import ContactUs from './components/ContactUs/ContactUs.jsx';

function Formation() {
  return (
    <>
      <Navbar />
      <ContactUs />
    </>
  );
}

export default Formation;