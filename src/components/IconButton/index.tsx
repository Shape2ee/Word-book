import React from 'react';
import $ from './iconButton.module.scss'
import classNames from 'classnames/bind';
import { ButtonProps } from '@customTypes/button';
import { ICON_BUTTON_LIST } from './contants';


const cx = classNames.bind($)
const IconButton = ({ text, onClick, icon, cercle }: ButtonProps) => {
  if (icon) {
    const iconBtn = ICON_BUTTON_LIST.filter((iconBtn) => iconBtn.text === text)[0]
    return (
      <button className={cx('btn', { cercle })} onClick={onClick}>{iconBtn.element}</button>
    )
  }
  return (
    <button className={cx('btn', { cercle })} onClick={onClick}>
      {text}
    </button>
  );
};

export default IconButton;