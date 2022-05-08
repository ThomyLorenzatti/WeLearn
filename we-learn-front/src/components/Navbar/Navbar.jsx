import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
import Address from '../MetamaskInfo/MetamaskInfo.jsx'

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
}

function Connect({ setUserAddress }) {
  return (
    <button class="button-metamask" onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [userAddress, setUserAddress] = useState("");

  const showButton = () => {
    setButton(true)
  }

  useEffect(() => {
    showButton();
  }, {});

  window.addEventListener('resize', showButton);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  return userAddress ? (
    <>
      <IconContext.Provider value={{ color: '#fff'}}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link to='/' className="navbar-logo">
                <span className="navbar-logotext1">We</span>
                <span className="navbar-logotext2">Learn</span>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <button
              type="button"
              class="button-metamask"
              onClick={(e) => {
                e.preventDefault();
                window.location.href='https://welearn-1.gitbook.io/welearn';
                }}>Whitepaper</button>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link to='/create-formation' className='nav-links'>
                  Create formation
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/formations' className='nav-links'>
                  Formations
                </Link>
              </li>
              <li className="nav-links">
                <Address userAddress={userAddress}/>
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  ) : (
    <IconContext.Provider value={{ color: '#fff'}}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                <span className="navbar-logotext1">We</span>
                <span className="navbar-logotext2">Learn</span>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {/* <li className="nav-item">
                <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                  Publish Formation
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                  My Certificates
                </Link>
              </li> */}
              <li className="nav-links">
                <button class="button-metamask" onClick={() => connect(setUserAddress)}>
                  Connect to MetaMask
                </button>
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
  );
}

export default Navbar