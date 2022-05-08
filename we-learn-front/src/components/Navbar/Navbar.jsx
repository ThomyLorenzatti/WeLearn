import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart, MdShoppingCart } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../button/button.jsx';
import MetaMaskAuth from '../../metamask.jsx';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
import { GiChessKing } from 'react-icons/gi';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const showButton = () => {
    setButton(true)
  }

  useEffect(() => {
    showButton();
  }, {});

  window.addEventListener('resize', showButton);

  // change state of click when clicked
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
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
              <li className="nav-item">
                <Link to='/create-formation' className='nav-links' onClick={closeMobileMenu}>
                  Create formation
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                  My Certificates
                </Link>
              </li>
              <li className="nav-links">
                <MetaMaskAuth onAddressChanged={address => {}} />
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Navbar