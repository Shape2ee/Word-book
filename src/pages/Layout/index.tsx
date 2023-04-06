import React, { useState, useEffect } from 'react';
import $ from './layout.module.scss'
import { Outlet } from 'react-router-dom'
import Wrapper from '@components/Wrapper';
import Header from '@components/Header'
import Nav from '@components/Nav'

const Layout = () => {
  return (
    <>
    <Header>
      <Nav />
    </Header>
    <div className={$.container}>
      <Outlet />
    </div>
    </>
  );
};

export default Layout;