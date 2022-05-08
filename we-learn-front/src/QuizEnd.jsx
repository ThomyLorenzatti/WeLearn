import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import FormQuiz from './components/FormQuiz/FormQuiz.jsx';

function QuizEnd() {
  return (
    <div>
      <Navbar />
      <FormQuiz />
    </div>
  );
}

export default QuizEnd;