import React, { useState } from 'react';
import $ from './wordTest.module.scss'
import Wrapper from '@components/Wrapper';
import Title from '@components/Title';

const WordTest = () => {
  const [testNumber, setTestNumber] = useState<number>(0)
  const handleTestNumber = (e: any) => {
    console.log(e.target.innerText)
    if (e.target.innerText === '10문제') {
      setTestNumber(10)
    } else if (e.target.innerText === '20문제') {
      setTestNumber(20)
    } else {
      const getNumber = prompt('문제의 갯수를 입력해주세요.')
      setTestNumber(Number(getNumber))
    }
  }
  return (
    <div className={$.word_test_container}>
      <Wrapper>
        <div>
          <Title text='단어 시험'/>
          <div>
            <button onClick={handleTestNumber}>10문제</button>
            <button onClick={handleTestNumber}>20문제</button>
            <button onClick={handleTestNumber}>직접입력</button>
          </div>
          <div>문제 수: {testNumber}</div>
          <h2>apple</h2>
          <form>
            <input placeholder='위의 단어의 뜻을 입력하세요.'/>
            <button>확인</button>
          </form>
        </div>
      </Wrapper>
    </div>
  );
};

export default WordTest;