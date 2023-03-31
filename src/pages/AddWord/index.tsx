import React from 'react';
import $ from './addWord.module.scss'
import Title from '@components/Title';
import Button from '@components/Button'

const AddWord = () => {
  return (
    <div className={$.add_container}>
      <Title text='단어 추가하기'/>
      <form>
        <div>
          <input type={'text'}/>
          <Button text='확인'/>
        </div>
        <div>
          <input type={'text'}/>
          <Button text='확인'/>
        </div>
        <div>
          <Button text='취소'/>
          <Button text='확인'/>
        </div>
      </form>
    </div>
  );
};

export default AddWord;
