import React from 'react'
import './index.css'
import App from './App'
import FormPage from './FormPage'
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
    </Routes>
  </BrowserRouter>,
  rootElement
);