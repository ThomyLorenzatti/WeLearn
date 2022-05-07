import './App.css';
import React from 'react';
import MetaMaskAuth from "./metamask";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Routes>
        <Route path='/' exact component={Home} />
      </Routes> */}
      <MetaMaskAuth onAddressChanged={address => {}} />
    </Router>
  );
}

export default App;