import React from 'react';
import $ from './nav.module.scss'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className={$.nav_container}>
      <ul>
        <li><Link to={'/'}>단어장</Link></li>
        <li><Link to={'/test'}>Test</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;