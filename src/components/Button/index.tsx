import React from 'react';
import $ from './button.module.scss'
import classNames from 'classnames/bind';
// import { ButtonProps } from '@customTypes/button';

interface ButtonProps {
  children?: JSX.Element
  text?: string
  onClick?: () => void
  cercle?: boolean
  fill?: boolean  
}

const cx = classNames.bind($)
const IconButton = ({ children, text, onClick, cercle, fill }: ButtonProps) => {
  return (
    <button className={cx('btn', { cercle, fill })} onClick={onClick}>
      {children}
      {text}
    </button>
  );
};

export default IconButton;