import React from 'react'
import './index.css'
import App from './App'
import FormPage from './FormPage'
import ContactUS from './ContactUS'
import Lesson from './Lesson'
import Formation from './Formation'
import CheckCertificates from './CheckCertificates'
import MyCertificates from './MyCertificates'
import SecretPage from './Secret'
import QuizEnd from './QuizEnd'
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-formation" element={<FormPage />} />
        <Route path="/formations" element={<Formation />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/secret" element={<SecretPage />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/final-quiz/:id" element={<QuizEnd />} />
        <Route path="/check-certificates" element={<CheckCertificates />} />
        <Route path="/my-certificates" element={<MyCertificates />} />
      </Routes>
      <Footer />
    </BrowserRouter>,
    rootElement
);