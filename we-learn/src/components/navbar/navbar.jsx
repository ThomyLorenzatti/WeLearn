import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart, MdShoppingCart } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../button/button.jsx';
import MetaMaskAuth from '../../metamask.jsx';
import './navbar.css';
import { IconContext } from 'react-icons/lib';
import { GiChessKing } from 'react-icons/gi';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton();
  }, {});

  window.addEventListener('resize', showButton);

  // change state of click when clicked
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff'}}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                WeLearn
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                  Create formation
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                  competences checker
                </Link>
              </li>
            </ul>
            <MetaMaskAuth onAddressChanged={address => {}} />
          </div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Navbar