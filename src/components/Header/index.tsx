import React, { ReactNode } from 'react'
import $ from './header.module.scss'
import { useNavigate } from 'react-router-dom';

const Header = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const goLogin = () => {
    navigate('/login')
  }

  return (
    <header className={$.header}>
      <h1>Word Book</h1>
      {children}
      <div className={$.login_container}>
        <div className={$.login} onClick={goLogin}>로그인</div>
        <div className={$.join}>회원가입</div>
      </div>
    </header>
  );
};

export default Header