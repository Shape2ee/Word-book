import React from 'react';
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
      <Search />
    </Header>
    <Wrapper>
      <Outlet />
    </Wrapper>
    </>
  );
};

export default Layout;