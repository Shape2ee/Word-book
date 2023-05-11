import React, { useState } from 'react'
import $ from './join.module.scss'
import Wrapper from '@components/Wrapper'
import Button from '@components/Button'
import Icon from '@components/Icon'

interface JoinInputs {
  joinId: string,
  joinPw1: string,
  joinPw2: string
}

const Join = () => {
  
  const [joinInputs, setJoinInputs] = useState<JoinInputs>({
    joinId: '',
    joinPw1: '',
    joinPw2: ''
  })

  const { joinId, joinPw1, joinPw2 } = joinInputs

  const handleJoinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name)
    setJoinInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(joinInputs)
  }

  return (
    <Wrapper>
      <div className={$.join_container}>
        <form onSubmit={handleJoinSubmit}>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='joinId'>아이디</label>
            </h3>
            <span className={$.input_box}>
              <input type='text' name='joinId' id='joinId'
                value={joinId} onChange={handleJoinInputChange}/>
                <Button>
                  <Icon kinds='cancell'/>
                </Button>
            </span>
            <span>필수 정보입니다.</span>
            <span>5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>
          </div>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='joinPw1'>비밀번호</label>
            </h3>
            <span className={$.input_box}>
              <input type='text' name='joinPw1' id='joinPw1'
                value={joinPw1} onChange={handleJoinInputChange}/>
              <span className={$.confirm_box}>
                <span>사용불가</span>
                <Icon kinds='shieldFillX'/>
              </span>
            </span>
            <span>필수 정보입니다.</span>
            <span>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
          </div>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='joinPw2'>비밀번호 확인</label>
            </h3>
            <span className={$.input_box}>
              <input type='text' name='joinPw2' id='joinPw2'
                value={joinPw2} onChange={handleJoinInputChange}/>
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