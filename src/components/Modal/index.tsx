import React from 'react';
import Button from '@components/Button'
import $ from './modal.module.scss'

const Modal = ({text, onCLick}: {text: string, onCLick: (path: string) => void}) => {
  return (
    <div className={$.modal_container}>
      <div className={$.wrapper}>
        <h3>{text}</h3>
        <div className={$.btn_wrap}>
          <Button text='확인' onClick={() => onCLick('./start')} width height6 fillMain />
          <Button text='취소' onClick={() => onCLick('./')} width height6 border />
        </div>
      </div>
    </div>
  );
};

export default Modal;