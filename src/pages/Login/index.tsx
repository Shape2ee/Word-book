import React, { useEffect, useState } from 'react';
import $ from './login.module.scss'
import Wrapper from '@components/Wrapper';
import Button from '@components/Button'
import Icon from '@components/Icon';
import { setUserId } from '@customModules/usersSlice';
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { fetcher } from '@api/Fetcher';
import { METHOD } from '@customTypes/CustumTypes';
const Login = () => {
  const dispatch = useAppDispatch()
  const [usersInfo, setUsersInfo] = useState<any[]>([])
  const [isResult, setResult] = useState<boolean>(false)
  const [isNotIdMatched, setNotIdMatched] = useState<boolean>(false)
  const [isNotPwMatched, setNotPwMatched] = useState<boolean>(false)
  const getUsersData = async () => {
    const userDb = await fetcher(METHOD.GET, '/users')
    setUsersInfo([...userDb])
  }
  useEffect(() => {
    getUsersData()
  }, [])
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(usersInfo)
    const formData = new FormData(e.currentTarget)

    for (let i = 0; i < usersInfo.length; i++) {
      if (usersInfo[i].userId !== formData.get('userId')) return
      if (usersInfo[i].userPw !== formData.get('userPw')) {
        setNotPwMatched(true)
        return
      }
      setNotPwMatched(false)
      setResult(true)
      dispatch(setUserId(usersInfo[i].userId))
    }
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
            <input type='text' name='userId' id='id' placeholder='아이디' />
            <span>
              <Icon kinds='cancell' />
            </span>
          </div>
          <div className={$.input_row}>
            <div className={$.icon}>
              <Icon kinds='lock'/>
            </div>
            <input type='password' name='userPw' id='password' placeholder='비밀번호'
              maxLength={16}
            />
            <span>
              <Icon kinds='cancell' />
            </span>
            {isNotPwMatched && <div>패스워드가 틀렸습니다.</div>}
          </div>
          <Button text='확인'/>
          <div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;