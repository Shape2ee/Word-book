import React from 'react';
import $ from './nav.module.scss'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import Icon from '@components/Icon';

const cx = classNames.bind($)
const Nav = () => {
  const location = useLocation()
  return (
    <nav className={$.nav_container}>
      <ul>
        <li className={`/` === location.pathname ? cx('active') : ''}>
          <Icon kinds='note' />
          <Link to={'/'}>
            단어 노트
          </Link>
        </li>
        <li className={`/test` === location.pathname ? cx('active') : ''}>
          <Icon kinds='test' />
          <Link to={'/test'}>
            단어 시험
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;