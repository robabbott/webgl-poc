import React from 'react';
import logo from '../images/bright-ai-logo.png'

const Header = () => {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Bright AI' />
    </header>
  );
};

export default Header;
