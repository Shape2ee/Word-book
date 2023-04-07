import React, { useState } from 'react';
import $ from './wordTest.module.scss'
import Wrapper from '@components/Wrapper';
import Title from '@components/Title';
import Modal from '@components/Modal';
import { countNumber } from '@customModules/gameSlice';
import { useAppDispatch } from '@hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const WordTest = () => {
  const [isModal,  setModal] = useState<boolean>(false)
  const [ModalText,  setModalText] = useState<string>('')
  const navgigate = useNavigate()

  const dispatch = useAppDispatch()
  const handleTestNumber = (e: any) => {
    console.log(e.target.innerText)
    if (e.target.innerText === '10문제') {
      dispatch(countNumber(10))
      setModalText('10')
      setModal(true)
      return
    }

    if (e.target.innerText === '20문제') {
      dispatch(countNumber(20))
      setModalText('20')
      setModal(true)
      return
    } 

    const getNumber = prompt('문제의 갯수를 입력해주세요.')
    if (getNumber !== null) {
      dispatch(countNumber(Number(getNumber)))
      setModalText(getNumber)
      setModal(true)
    }
  }

  const handleModalClick = (path: string) => {
    navgigate(path)
    setModal(false)
  }

  return (
    <div className={$.word_test_container}>
      {isModal && <Modal text={`${ModalText} 문제의 단어 시험을 보시겠습니까?`} onCLick={handleModalClick}/>}
      <Wrapper>
        <div>
          <Title text='단어 시험'/>
          <div>
            <button onClick={handleTestNumber}>10문제</button>
            <button onClick={handleTestNumber}>20문제</button>
            <button onClick={handleTestNumber}>직접입력</button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default WordTest;