import React, { ReactNode } from 'react'
import $ from './wrapper.module.scss'

const Wrapper = ({ children }: { children: ReactNode}) => {
  return (
    <div className={$.wrapper}>
      { children }
    </div>
  );
};

export default Wrapper;