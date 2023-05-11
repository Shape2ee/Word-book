import React, { useRef, useState } from 'react'
import $ from './join.module.scss'
import Wrapper from '@components/Wrapper'
import Button from '@components/Button'
import Icon from '@components/Icon'
import classNames from 'classnames/bind'

const cx = classNames.bind($)

interface JoinInputs {
  joinId: string,
  joinPw1: string,
  joinPw2: string
}
interface JoinInputsFocus {
  joinIdFocus: boolean,
  joinPw1Focus: boolean,
  joinPw2Focus: boolean
}

const Join = () => {
  const joinIdRef = useRef<HTMLInputElement>(null)
  const joinPw1Ref = useRef<HTMLInputElement>(null)
  const joinPw2Ref = useRef<HTMLInputElement>(null)
  const [joinInputs, setJoinInputs] = useState<JoinInputs>({
    joinId: '',
    joinPw1: '',
    joinPw2: ''
  })
  const [isInputsFocus, setInputsFocus] = useState<JoinInputsFocus>({
    joinIdFocus: false,
    joinPw1Focus: false,
    joinPw2Focus: false
  })
  const { joinId, joinPw1, joinPw2 } = joinInputs
  const { joinIdFocus, joinPw1Focus, joinPw2Focus } = isInputsFocus

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

  
  const inputFocusCheck = (input:string, input1: string, input2: string) => {
    if (input === input1) {
      joinIdRef.current?.focus()
    } else if (input === input2) {
      joinPw1Ref.current?.focus()
    } else {
      joinPw2Ref.current?.focus()
    }
  }

  const handleJoinInputsReset = (input: string) => {
    setJoinInputs((prev) => {
      return {
        ...prev,
        [input]: '',
      }
    })
    inputFocusCheck(input, 'joinId', 'joinPw1')
  }

  const handleInputFocus = (input: string) => {
    setInputsFocus((prev) => {
      return {
        ...prev,
        [input]: true
      }
    })
    inputFocusCheck(input, 'joinIdFocus', 'joinPw1Focus')
  }

  const handleInputBlur = (input: string) => {
    setInputsFocus((prev) => {
      return {
        ...prev,
        [input]: false
      }
    })
  }

  return (
    <Wrapper>
      <div className={$.join_container}>
        <form onSubmit={handleJoinSubmit}>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='joinId'>아이디</label>
            </h3>
            <span className={cx('input_box', joinIdFocus ? 'focus' : '')} 
              onClick={() => handleInputFocus('joinIdFocus')}
              onBlur={() => handleInputBlur('joinIdFocus')}>
              <input type='text' name='joinId' id='joinId'
                ref={joinIdRef}
                value={joinId} onChange={handleJoinInputChange}/>
                { 
                  joinId && (
                    <Button onClick={() => handleJoinInputsReset('joinId')} IconMargin0>
                      <Icon kinds='cancell'/>
                    </Button>
                  )
                }
            </span>
            <span className={$.error_title}>5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>
          </div>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='joinPw1'>비밀번호</label>
            </h3>
            <span className={cx('input_box', joinPw1Focus ? 'focus' : '')} 
              onClick={() => handleInputFocus('joinPw1Focus')}
              onBlur={() => handleInputBlur('joinPw1Focus')}>
              <input type='text' name='joinPw1' id='joinPw1'
                ref={joinPw1Ref}
                value={joinPw1} onChange={handleJoinInputChange}/>
              { 
                joinPw1 && (
                  <Button onClick={() => handleJoinInputsReset('joinPw1')} IconMargin0>
                    <Icon kinds='cancell'/>
                  </Button>
                )
              }
              <span className={$.confirm_box}>
                <span>사용불가</span>
                <Icon kinds='shieldFillX'/>
              </span>
            </span>
            <span className={$.error_title}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
          </div>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='joinPw2'>비밀번호 확인</label>
            </h3>
            <span className={cx('input_box', joinPw2Focus ? 'focus' : '')}
              onClick={() => handleInputFocus('joinPw2Focus')}
              onBlur={() => handleInputBlur('joinPw2Focus')}>
              <input type='text' name='joinPw2' id='joinPw2'
                ref={joinPw2Ref}
                value={joinPw2} onChange={handleJoinInputChange}/>
              { 
                joinPw2 && (
                  <Button onClick={() => handleJoinInputsReset('joinPw2')} IconMargin0>
                    <Icon kinds='cancell'/>
                  </Button>
                )
              }
              <span>확인</span>
            </span>
            <span className={$.error_title}>비밀번호가 일치하지 않습니다.</span>
          </div>
          <Button text='가입하기' width fillMain height6 marginTop />
        </form>
      </div>
    </Wrapper>
  )
}

export default Join