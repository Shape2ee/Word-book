import React from 'react';
import $ from './layout.module.scss'
import { Outlet } from 'react-router-dom'
import Wrapper from '@components/Wrapper';
import Header from '@components/Header'
import Nav from '@components/Nav'
import Search from '@components/Search';

const Layout = () => {
  return (
    <>
    <Header>
      <Nav />
    </Header>
    <div className={$.container}>
      <Search />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
    </>
  );
};

export default Layout;