import React, { useRef, useState } from 'react'
import $ from './join.module.scss'
import Wrapper from '@components/Wrapper'
import Button from '@components/Button'
import Icon from '@components/Icon'
import classNames from 'classnames/bind'
import Modal from '@components/Modal'
import InputRow from './InputRow'
import { JoinInputs, PasswordCheck } from '@customTypes/CustumTypes'
import { METHOD } from '@customTypes/CustumTypes'
import { fetcher } from '@api/Fetcher'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind($)

const Join = () => {
  const joinIdRef = useRef<HTMLInputElement>(null)
  const joinPw1Ref = useRef<HTMLInputElement>(null)
  const joinPw2Ref = useRef<HTMLInputElement>(null)
  const [joinInputs, setJoinInputs] = useState<JoinInputs>({
    joinId: '',
    joinIdFocus: false,
    joinPw1: '',
    joinPw1Focus: false,
    joinPw2: '',
    joinPw2Focus: false
  })
  const { joinId, joinPw1, joinPw2, joinIdFocus, joinPw1Focus, joinPw2Focus } = joinInputs
  const [isIdNoneValue, setIdNoneValue] = useState<boolean>(false)
  const [isIdError, setIdError] = useState<boolean>(false)
  const [isIdDuplication, setIdDuplication] = useState<boolean>(false)
  const [isPasswordCheck, setPasswordCheck] = useState<PasswordCheck>({
    isPw1NoneValue: false,
    isPw2NoneValue: false,
    isPw1Error: false,
    isPw2Error: false
  })
  const { isPw1NoneValue, isPw2NoneValue, isPw1Error, isPw2Error } = isPasswordCheck
  const [isPassword1Success, setPassword1Succedd] = useState<boolean>(false)
  const [isPassword2Success, setPassword2Succedd] = useState<boolean>(false)
  const [isModal, setModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }

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
      setIdDuplication(false)
      return
    }
    setIdNoneValue(false)

    const users = await fetcher(METHOD.GET, '/users')
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === joinId) {
        setIdDuplication(true)
        return
      }
    }
    setIdDuplication(false)

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
    console.log(isPw2Error)
  }

  const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isIdNoneValue || isIdError || isPw1NoneValue || isPw1Error || isPw2NoneValue || isPw2Error) return
    console.log(joinId, joinPw1, joinPw2)

    await fetcher(METHOD.POST, '/users', {
      userId: joinId,
      userPw: joinPw1
    })
    setModal(true)

  }
  
  const inputFocusCheck = (input:string) => {
    console.log(input)
    if (input === 'joinIdFocus') {
      joinIdRef.current?.focus()
    } else if (input === 'joinPw1Focus') {
      joinPw1Ref.current?.focus()
    } else {
      joinPw2Ref.current?.focus()
    }
  }

  const handleInputFocus = (input: string) => {
    setJoinInputs((prev) => {
      return {
        ...prev,
        [input]: true
      }
    })
    inputFocusCheck(input)
  }

  const handleInputBlur = (input: string) => {
    setJoinInputs((prev) => {
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

  return (
    <Wrapper>
      <div className={$.join_container}>
        <form onSubmit={handleJoinSubmit}>
          <InputRow title='아이디' name='joinId' inputId
            inputType='text'
            focus={joinIdFocus} 
            forwardedRef={joinIdRef}
            value={joinId}
            onClick={() => handleInputFocus('joinIdFocus')}
            onBlur={() => handleInputBlur('joinIdFocus')}
            onChange={handleJoinInputChange}
            isNoneValue={isIdNoneValue}
            isIdDuplication={isIdDuplication}
            isIdError={isIdError}
          />
          <InputRow title='비밀번호' name='joinPw1'
            inputType='password'
            focus={joinPw1Focus}
            forwardedRef={joinPw1Ref}
            value={joinPw1}
            onClick={() => handleInputFocus('joinPw1Focus')}
            onBlur={() => handleInputBlur('joinPw1Focus')}
            onChange={handleJoinInputChange}
            confirmBox
            isError={isPw1Error}
            isPasswordSuccess={isPassword1Success}
            isNoneValue={isPw1NoneValue}
            isPwError={isPw1Error}
          />
          <InputRow title='비밀번호 확인' name='joinPw2'
            inputType='password'
            focus={joinPw2Focus}
            forwardedRef={joinPw2Ref}
            value={joinPw2}
            onClick={() => handleInputFocus('joinPw2Focus')}
            onBlur={() => handleInputBlur('joinPw2Focus')}
            onChange={handleJoinInputChange}
            confirmBox
            isError={isPw2Error}
            isPasswordSuccess={isPassword2Success}
            isNoneValue={isPw2NoneValue}
            isPwSame={isPw2Error}
          />
          <Button text='가입하기' width fillMain height6 marginTop />
        </form>
        {isModal && <Modal text='가입을 축하드립니다. 로그인 하시겠습니까?' go='/login' back={goHome}/>}
      </div>
    </Wrapper>
  )
}

export default Join