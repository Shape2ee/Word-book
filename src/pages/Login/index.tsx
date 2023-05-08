import React, { useEffect, useState } from 'react';
import $ from './login.module.scss'
import Wrapper from '@components/Wrapper';
import Button from '@components/Button'
import Icon from '@components/Icon';
import { setUserId } from '@customModules/usersSlice';
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { fetcher } from '@api/Fetcher';
import { METHOD } from '@customTypes/CustumTypes';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [usersInfo, setUsersInfo] = useState<any[]>([])
  const [isResult, setResult] = useState<boolean>(false)
  const [userIdInput, setUserIdInput] = useState<string>('')
  const [userPwInput, setUserPwInput] = useState<string>('')
  const [isNotIdMatched, setNotIdMatched] = useState<boolean>(false)
  const [isNotPwMatched, setNotPwMatched] = useState<boolean>(false)

  const getUsersData = async () => {
    const userDb = await fetcher(METHOD.GET, '/users')
    setUsersInfo([...userDb])
  }

  useEffect(() => {
    getUsersData()
  }, [])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'userId') {
      setUserIdInput(e.target.value)
    } else {
      setUserPwInput(e.target.value)
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(usersInfo)
    const formData = new FormData(e.currentTarget)

    for (let i = 0; i < usersInfo.length; i++) {
      if (usersInfo[i].userId !== formData.get('userId')) {
        alert('아이디가 존재하지 않습니다!')
        setUserIdInput('')
        setUserPwInput('')
        return
      }
      if (usersInfo[i].userPw !== formData.get('userPw')) {
        setNotPwMatched(true)
        setUserIdInput('')
        setUserPwInput('')
        return
      }
      setNotPwMatched(false)
      setResult(true)
      sessionStorage.setItem('user', usersInfo[i].userId)
      navigate('/')
    }
    console.log(userIdInput)
    console.log(formData.get('userId'), formData.get('userPw'))
    console.log(isResult)
  }

  return (
    <Wrapper>
      <div className={$.login_container}>
        <form onSubmit={handleFormSubmit}>
          <div className={$.input_row}>
            <div className={$.icon}>
              <Icon kinds='user'/>
            </div>
            <input type='text' name='userId' id='id' placeholder='아이디' 
              value={userIdInput}
              onChange={handleChangeInput}/>
            {
              userIdInput && (
                <span className={$.reset_button}>
                  <Icon kinds='cancell' />
                </span>
              )
            }
          </div>
          <div className={$.input_row}>
            <div className={$.icon}>
              <Icon kinds='lock'/>
            </div>
            <input type='password' name='userPw' id='password' placeholder='비밀번호'
              maxLength={16}
              value={userPwInput}
              onChange={handleChangeInput}
            />
            {
              userPwInput && (
                <span className={$.reset_button}>
                  <Icon kinds='cancell' />
                </span>
              )
            }
            {isNotPwMatched && <div>패스워드가 틀렸습니다.</div>}
          </div>
          <div>
              <label>
                <input type='checkbox' />
                <span>비밀번호 보기</span>
              </label>
            </div>
          <Button text='로그인' width fillMain height6/>
          <div className={$.join_button}>
            <Button text='회원가입' />
          </div>
          <div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;