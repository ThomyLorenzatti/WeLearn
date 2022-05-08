import React from 'react'
import './index.css'
import App from './App'
import FormPage from './FormPage'
import Lesson from './Lesson'
import Formation from './Formation'
import SecretPage from './Secret'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-formation" element={<FormPage />} />
      <Route path="/formations" element={<Formation />} />
      <Route path="/lesson/:id" element={<Lesson />} />
      <Route path="/secret" element={<SecretPage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);