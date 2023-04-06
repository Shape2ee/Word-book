import React, { useState, useEffect } from 'react';
import $ from './layout.module.scss'
import { Outlet } from 'react-router-dom'
import Wrapper from '@components/Wrapper';
import Header from '@components/Header'
import Nav from '@components/Nav'
import Search from '@components/Search';
import { WordList } from '@customTypes/CustumTypes';
import { useAppDispatch } from '@hooks/reduxHooks';
import { readWord } from '@customModules/wordSlice';

// async function getData() {
//   const data = await fetch('http://localhost:5173/data/mockData.json')
//       .then((res) => res.json())
//       .catch((err) => console.log(err))
//       .then((data) => data)
//   return data
// }
const Layout = () => {
  // const dispatch = useAppDispatch()
  // const newData = getData()
  // console.log(newData)
  // dispatch(readWord(newData))

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