import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import CheckCertificate from './components/CheckCertificate/CheckCertificate.jsx';

function FormPage() {
  return (
    <div class="form-div">
      <CheckCertificate />
    </div>
  );
}

export default FormPage;