import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/bright-ai-logo.png'

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Bright AI' />
      </Link>
    </header>
  );
};

export default Header;
