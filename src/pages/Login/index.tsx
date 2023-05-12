import React, { useEffect, useState, useRef } from 'react';
import $ from './login.module.scss'
import Wrapper from '@components/Wrapper';
import Button from '@components/Button'
import Icon from '@components/Icon';
import ResetButton from '@components/ResetButton';
// import { setUserId } from '@customModules/usersSlice';
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { fetcher } from '@api/Fetcher';
import { METHOD } from '@customTypes/CustumTypes';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind($)

interface inputFocusState {
  idFocus: boolean,
  passwordFocus: boolean,
}

const Login = () => {
  const navigate = useNavigate()
  const passwordRef = useRef<HTMLInputElement>(null)
  const [usersInfo, setUsersInfo] = useState<any[]>([])
  const [userIdInput, setUserIdInput] = useState<string>('')
  const [userPwInput, setUserPwInput] = useState<string>('')
  const [isNotPwMatched, setNotPwMatched] = useState<boolean>(false)
  const [isShowPwChecked, setShowPwChecked] = useState<boolean>(false)
  const [isInputFocus, setInputFocus] = useState<inputFocusState>({
    idFocus: false,
    passwordFocus: false,
  });
  const { idFocus, passwordFocus } = isInputFocus;

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userIdInput === '' || userPwInput === '') return
    const userIdList = await usersInfo.map((item) => item.userId)
    if (!userIdList.includes(userIdInput)) {
      alert('아이디가 존재하지 않습니다!')
      setUserIdInput('')
      setUserPwInput('')
      return
    }

    const IdIndex = await userIdList.indexOf(userIdInput)
    if (IdIndex < 0) return
    if (usersInfo[IdIndex].userPw !== userPwInput) {
      setNotPwMatched(true)
      setUserIdInput('')
      setUserPwInput('')
      return
    }
    await setNotPwMatched(false)
    sessionStorage.setItem('user', usersInfo[IdIndex].userId)
    navigate('/')
  }
  
  const resetInputValue = (e: React.MouseEvent) => {
    const siblingInput = e.currentTarget.previousElementSibling
    if (siblingInput === null) return
    if (siblingInput.id === 'id') {
      setUserIdInput('')
    } else {
      setUserPwInput('')
    }
  }

  const handleShowPwChecked = async () => {
    const password = await passwordRef.current
    if (password === null) return

    await setShowPwChecked(!isShowPwChecked)
    console.log(isShowPwChecked)
    if(!isShowPwChecked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }
  
  const handleFocusInput = (input: string) => {
    setInputFocus((prev) => {
      return {
        ...prev,
        [input]: true,  
      }
    });
  }

  const handleBlurInput = (input: string) => {
    setInputFocus((prev) => {
      return {
        ...prev,
        [input]: false,  
      }
    });
  };

  const goJoin = () => {
    navigate('/join')
  }

  return (
    <Wrapper>
      <div className={$.login_container}>
        <form onSubmit={handleFormSubmit}>
          <div className={cx('input_row', idFocus ? 'focus' : '' )}
            onFocus={() => handleFocusInput('idFocus')}
            onBlur={() => handleBlurInput('idFocus')}>
            <div className={$.icon}>
              <Icon kinds='user'/>
            </div>
            <input type='text' name='userId' id='id' placeholder='아이디' 
              value={userIdInput}
              onChange={handleChangeInput}/>
            {
              userIdInput && <ResetButton icon='cancell' onClick={resetInputValue}/>
            }
          </div>
          <div className={cx('input_row', passwordFocus ? 'focus' : '' )}
            onFocus={() => handleFocusInput('passwordFocus')}
            onBlur={() => handleBlurInput('passwordFocus')}>
            <div className={$.password_wrapper}>
              <div className={$.icon}>
                <Icon kinds='lock'/>
              </div>
              <input type='password' name='userPw' id='password' placeholder='비밀번호'
                maxLength={16}
                value={userPwInput}
                onChange={handleChangeInput}
                ref={passwordRef}
              />
            </div>
            {
              userPwInput && <ResetButton icon='cancell' onClick={resetInputValue}/>
            }
            {isNotPwMatched && <span className={$.not_password}>비밀번호가 틀렸습니다. 다시 입력해 주세요.</span>}
          </div>
          <div className={$.show_password_button}>
            <label>
              <input type='checkbox' onChange={handleShowPwChecked} />
              <Icon kinds={isShowPwChecked ? 'checkboxFill' : 'checkboxLine'}/>
              <span className={$.show_password_title}>비밀번호 보기</span>
            </label>
          </div>
          <Button text='로그인' width fillMain height6/>
          </form>
          <div className={$.join_button}>
            <Button text='회원가입' onClick={goJoin}/>
          </div>
      </div>
    </Wrapper>
  );
};

export default Login;