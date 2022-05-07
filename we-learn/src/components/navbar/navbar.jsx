import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart, MdShoppingCart } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../button/button.jsx';
import './navbar.css';
import { IconContext } from 'react-icons/lib';
import { GiChessKing } from 'react-icons/gi';

function Navbar() {
  // init click to false and button to true
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  // depending on window size, sets button value
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

  // when window resizing, checks if it has to show button or not
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
              <GiChessKing className='navbar-icon' />
              JIMMY AGULLA
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                  Projects
                </Link>
              </li>
              <li className=",av-btn">
                {button ? (
                  <Link to='contact' className="btn-link" onClick={closeMobileMenu}>
                    <Button buttonStyle='btn--outline'>CONTACT</Button>
                  </Link>
                ) : (
                  <Link to='contact' className="btn-link" onClick={closeMobileMenu}>
                    <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>SIGN UP</Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Navbar