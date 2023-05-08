import React, { ReactNode, useState, useEffect } from 'react'
import $ from './header.module.scss'
import Icon from '@components/Icon';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind($)

const Header = ({ children }: { children: ReactNode }) => {
  const user = sessionStorage.getItem('user')
  const [isLogin, setLogin] = useState<boolean>(false)
  const [activeLoginContainer, setActiveLoginContainer] = useState<boolean>(false)
  const navigate = useNavigate()

  const goLogin = () => {
    navigate('/login')
  }

  const checkUserId = async () => {
    if (user === null) return
    setLogin(true)
  }

  useEffect(() => {
    checkUserId()
  }, [user])

  const handleLogOut = () => {
    sessionStorage.removeItem('user')
    setLogin(false)
    location.reload();
  }

  const handleOpenLoginContainer = () => {
    setActiveLoginContainer(!activeLoginContainer)
  }

  return (
    <header className={$.header}>
      <h1>Word Book</h1>
      {children}
      <div className={cx('login_container', activeLoginContainer ? 'active' : '')}>
        <div className={$.login} onClick={isLogin ? handleLogOut : goLogin}>{isLogin ? '로그아웃' : '로그인'}</div>
        <div className={$.join}>회원가입</div>
      </div>
      <div className={$.mobile_login_container} onClick={handleOpenLoginContainer}>
        <Icon kinds='user' />
      </div>
    </header>
  );
};

export default Header