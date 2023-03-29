import React, { ReactNode } from 'react';

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header>
      <h1>Word Book</h1>
      {children}
    </header>
  );
};

export default Header;