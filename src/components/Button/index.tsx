import React from 'react';
import $ from './iconButton.module.scss'
import classNames from 'classnames/bind';
import { ButtonProps } from '@customTypes/button';


const cx = classNames.bind($)
const IconButton = ({ text, onClick, cercle }: ButtonProps) => {
  return (
    <button className={cx('btn', { cercle })} onClick={onClick}>
      {text}
    </button>
  );
};

export default IconButton;