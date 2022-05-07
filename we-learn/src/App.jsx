import React from 'react';
import './App.css';
import MetaMaskAuth from "./metamask";
import MetaMaskLogo from "./favicon.svg"

function App() {
  return (
    <main>
      <div className="logoContainer">
        <img src={MetaMaskLogo} height={90}/>
      </div>
      <MetaMaskAuth onAddressChanged={address => {}}/>
    </main>
  );
}

export default App;