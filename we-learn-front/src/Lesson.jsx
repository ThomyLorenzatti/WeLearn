import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import LessonContent from './components/Lesson/LessonContent.jsx';

function Formation() {
  return (
    <>
      <Navbar />
      <LessonContent />
    </>
  );
}

export default Formation;