import React from 'react';
import $ from './nav.module.scss'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import Icon from '@components/Icon';

const cx = classNames.bind($)

interface NavListType {
  id: number
  title: string
  path: string
  icon: string
}

const NavList: NavListType[] = [
  {
    id: 1,
    title: '단어 노트',
    path: '/',
    icon: 'note'
  },
  {
    id: 2,
    title: '단어 시험',
    path: '/test',
    icon: 'test'
  },
]
const Nav = () => {
  const location = useLocation()
  return (
    <nav className={$.nav_container}>
      <ul>
        {
          NavList.map((li) => (
            <li className={li.path === location.pathname ? cx('active') : ''}>
              <Link to={li.path}>
                <Icon kinds={li.icon} /> 
                <span className={$.text}>{li.title}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Nav;