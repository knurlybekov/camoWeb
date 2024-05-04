import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className='navbar'>
      <h1>CamoWeb</h1>
      <ul className='nav-links'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/shop'>Shop</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact Us</Link></li>
      </ul>
    </div>
  );
};
