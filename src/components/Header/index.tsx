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

  const goJoin = () => {
    navigate('/join')
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

  const handleBlurLoginContainer = () => {
    setTimeout(() => {
      setActiveLoginContainer(false)
    }, 200);
  }
  return (
    <header className={$.header}>
      <h1>Word Book</h1>
      {children}
      <div onBlur={handleBlurLoginContainer} className={isLogin ? $.login : ''}>
        <button className={cx('mobile_login_container', activeLoginContainer ? 'active' : '')} onClick={handleOpenLoginContainer}>
          <Icon kinds='user' />
        </button>
        <div className={$.login_container}>
          <div className={$.login} onClick={isLogin ? handleLogOut : goLogin}>
            {isLogin ? '로그아웃' : '로그인'}
          </div>
          {!isLogin && <div className={$.join} onClick={goJoin}>회원가입</div>}
        </div>
      </div>
    </header>
  );
};

export default Header