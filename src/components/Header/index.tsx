import React, { ReactNode } from 'react'
import $ from './header.module.scss'

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className={$.header}>
      <h1>Word Book</h1>
      {children}
    </header>
  );
};

export default Header