import React, { ReactNode, useState, useEffect } from 'react'
import $ from './header.module.scss'
import { useNavigate } from 'react-router-dom';

const Header = ({ children }: { children: ReactNode }) => {
  const user = sessionStorage.getItem('user')
  const [isLogin, setLogin] = useState<boolean>(false)
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

  return (
    <header className={$.header}>
      <h1>Word Book</h1>
      {children}
      <div className={$.login_container}>
        <div className={$.login} onClick={isLogin ? handleLogOut : goLogin}>{isLogin ? '로그아웃' : '로그인'}</div>
        <div className={$.join}>회원가입</div>
      </div>
    </header>
  );
};

export default Header