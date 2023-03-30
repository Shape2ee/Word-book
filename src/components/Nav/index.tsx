import React from 'react';
import $ from './nav.module.scss'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'

const cx = classNames.bind($)
const Nav = () => {
  const location = useLocation()
  return (
    <nav className={$.nav_container}>
      <ul>
        <li className={`/` === location.pathname ? cx('active') : ''}><Link to={'/'}>단어장</Link></li>
        <li className={`/test` === location.pathname ? cx('active') : ''}><Link to={'/test'}>Test</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;