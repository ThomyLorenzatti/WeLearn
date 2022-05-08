import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Form from './components/Form/Form.jsx';

function FormPage() {
  return (
    <div>
      <Navbar />
      <Form />
    </div>
  );
}

export default FormPage;