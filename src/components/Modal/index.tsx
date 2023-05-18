import React from 'react';
import Button from '@components/Button'
import $ from './modal.module.scss'
import { useNavigate } from 'react-router-dom';

const Modal = ({text, go, back}: { text: string, go:string, back:() => void }) => {
  const navigate = useNavigate()

  const handleModalClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className={$.modal_container}>
      <div className={$.wrapper}>
        <h3>{text}</h3>
        <div className={$.btn_wrap}>
          <Button text='확인' onClick={() => handleModalClick(go)} width height6 fillMain />
          <Button text='취소' onClick={back} width height6 border />
        </div>
      </div>
    </div>
  );
};

export default Modal;