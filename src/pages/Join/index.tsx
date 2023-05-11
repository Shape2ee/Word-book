import React, { useEffect, useRef, useState } from 'react'
import $ from './join.module.scss'
import Wrapper from '@components/Wrapper'
import Button from '@components/Button'
import Icon from '@components/Icon'
import classNames from 'classnames/bind'
import { JoinInputs, JoinInputsFocus, PasswordCheck } from '@customTypes/CustumTypes'

const cx = classNames.bind($)

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
  const [isIdNoneValue, setIdNoneValue] = useState<boolean>(false)
  const [isIdError, setIdError] = useState<boolean>(false)
  const [isPasswordCheck, setPasswordCheck] = useState<PasswordCheck>({
    isPw1NoneValue: false,
    isPw2NoneValue: false,
    isPw1Error: false,
    isPw2Error: false
  })
  const { isPw1NoneValue, isPw2NoneValue, isPw1Error, isPw2Error } = isPasswordCheck
  const [isPassword1Success, setPassword1Succedd] = useState<boolean>(false)
  const [isPassword2Success, setPassword2Succedd] = useState<boolean>(false)
  
  const handleJoinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name)
    setJoinInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckId = async () => {
    if (joinId === '') {
      await setIdNoneValue(true)
      setIdError(false)
      return
    }
    setIdNoneValue(false)

    if (joinId.length < 5 || joinId.length > 20) {
      await setIdError(true)
      return
    }
    const regex = /[^a-z\d-_]/g
    const checkId = await regex.test(joinId)
    if (checkId) {
      await setIdError(true)
      return
    }
    setIdError(false)
  }

  const handleCheckPassword = async () => {
    if (joinPw1 === '') {
      setPasswordCheck((prev) => ({
        ...prev,
        isPw1Error: false,
        isPw1NoneValue: true
      }))
      setPassword1Succedd(false)
      return 
    }
    setPasswordCheck((prev) => ({
      ...prev,
      isPw1NoneValue: false,
    }))

    if (joinPw1.length < 8 || joinPw1.length > 16) {
      setPasswordCheck((prev) => ({
        ...prev,
        isPw1Error: true,
      }))
      setPassword1Succedd(false)
      return
    }
    
    const regex = /^[a-zA-Z\d`~!@#$%^&*()-_=+]$/
    const checkPassword = await regex.test(joinPw1)

    if (checkPassword) {
      setPasswordCheck((prev) => ({
        ...prev,
        isPw1Error: true,
      }))
      setPassword1Succedd(false)
      return
    }
    setPassword1Succedd(true)
    setPasswordCheck((prev) => ({
      ...prev,
      isPw1Error: false,
    }))    
  }
  
  const handleSamePassword = () => {
    if (joinPw2 === '') {
      setPasswordCheck((prev) => ({
        ...prev,
        isPw2Error: false,
        isPw2NoneValue: true
      }))
      setPassword2Succedd(false)
      return
    }
    setPasswordCheck((prev) => ({
      ...prev,
      isPw2NoneValue: false
    }))

    if (joinPw1 !== joinPw2) {
      setPasswordCheck((prev) => ({
        ...prev,
        isPw2Error: true,
      }))
      setPassword2Succedd(false)
      return
    }
    setPasswordCheck((prev) => ({
      ...prev,
      isPw2Error: false,
    }))
    setPassword2Succedd(true)
  }


  const handleJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(!isIdNoneValue, !isIdError, !isPasswordSuccess, !isPw2NoneValue, !isPw2Error)
    if (!isIdNoneValue || !isIdError || !isPw1NoneValue || !isPw1Error || !isPw2NoneValue || !isPw2Error) return
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
    if (input === 'joinIdFocus') {
      handleCheckId()
    } else if (input === 'joinPw1Focus'){
      handleCheckPassword()
      handleSamePassword()
    } else {
      handleSamePassword()
    }
  }

  // useEffect(() => {
  //   handleSamePassword()
  // }, [])
  return (
    <Wrapper>
      <div className={$.join_container}>
        <form onSubmit={handleJoinSubmit}>
          <div className={$.input_row}>
            <h3 className={$.join_title}>
              <label htmlFor='joinId'>아이디</label>
            </h3>
            <span className={cx('input_box', 'input_id', joinIdFocus ? 'focus' : '')} 
              onClick={() => handleInputFocus('joinIdFocus')}
              onBlur={() => handleInputBlur('joinIdFocus')}>
              <input type='text' name='joinId' id='joinId'
                ref={joinIdRef}
                value={joinId} onChange={handleJoinInputChange}/>
            </span>
            {isIdNoneValue && <span className={$.error_title}>필수 정보입니다.</span>}
            {isIdError && <span className={$.error_title}>5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>}
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
              <span className={cx('confirm_box', isPw1Error ? 'error' : isPassword1Success ? 'success' : '')}>
                {isPw1Error && <span>사용불가</span>}
                {isPassword1Success && <span>사용가능</span>}
                <Icon kinds={isPw1Error ? 'shieldFillX': 'shieldLock'}/>
              </span>
            </span>
            {isPw1NoneValue && <span className={$.error_title}>필수 정보입니다.</span>}
            {isPw1Error && <span className={$.error_title}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>}
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
              <span className={cx('confirm_box', isPw2Error ? 'error' : isPassword2Success ? 'success' : '')}>
                <Icon kinds={isPw2NoneValue ? 'shieldCheck' : isPassword2Success ? 'shieldFillCheck' : 'shieldCheck'}/>
              </span>
            </span>
            {isPw2NoneValue && <span className={$.error_title}>필수 정보입니다.</span>}
            {isPw2Error && <span className={$.error_title}>비밀번호가 일치하지 않습니다.</span>}
          </div>
          <Button text='가입하기' width fillMain height6 marginTop />
        </form>
      </div>
    </Wrapper>
  )
}

export default Join