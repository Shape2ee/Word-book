import React from 'react'
import $ from './join.module.scss'
import Wrapper from '@components/Wrapper'
import Button from '@components/Button'

const Join = () => {
  return (
    <Wrapper>
      <div className={$.join_container}>
        <form>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='id'>아이디</label>
            </h3>
            <span className={$.input_box}>
              <input type='text' name='id' id='id'/>
            </span>
            <span>필수 정보입니다.</span>
            <span>5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>
          </div>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='password1'>비밀번호</label>
            </h3>
            <span className={$.input_box}>
              <input type='text' name='password1' id='password1'/>
              <span>사용불가</span>
            </span>
            <span>필수 정보입니다.</span>
            <span>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
          </div>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='password2'>비밀번호 확인</label>
            </h3>
            <span className={$.input_box}>
              <input type='text' name='password2' id='password2'/>
              <span>확인</span>
            </span>
            <span>필수 정보입니다.</span>
            <span>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
          </div>
          <Button text='가입하기' width fillMain height6 />
        </form>
      </div>
    </Wrapper>
  )
}

export default Join