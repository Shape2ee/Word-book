import React from 'react';
import $ from './button.module.scss'
import classNames from 'classnames/bind';
// import { ButtonProps } from '@customTypes/button';

interface ButtonProps {
  children?: JSX.Element
  type?: "button" | "submit" | "reset" | undefined
  text?: string
  onClick?: (e?: any) => void
  cercle?: boolean
  fillWhite?: boolean
  width?: boolean
  fillMain?: boolean
  border?: boolean
  height6?: boolean
  color?: boolean
  mobileNone?: boolean,
  IconMargin0?: boolean,
}

const cx = classNames.bind($)
const IconButton = ({ 
  children,
  type,
  text,
  onClick,
  cercle,
  fillWhite,
  width,
  fillMain,
  border,
  height6,
  color,
  mobileNone,
  IconMargin0
}: ButtonProps) => {
  return (
    <button type={type} className={cx('btn', { 
      cercle,
      fillWhite,
      width,
      fillMain,
      border,
      height6,
      color,
      mobileNone,
      IconMargin0
    })} onClick={onClick}>
      {children}
      {text && <span className={cx('text', { mobileNone })}>{text}</span>}
    </button>
  );
};

export default IconButton;