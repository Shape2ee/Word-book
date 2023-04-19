import React from 'react';
import $ from './login.module.scss'
import Wrapper from '@components/Wrapper';
import Button from '@components/Button'
import Icon from '@components/Icon';

const Login = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <Wrapper>
      <div className={$.login_container}>
        <form onSubmit={handleFormSubmit}>
          <div className={$.input_row}>
            <div className={$.icon}>
              <Icon kinds='user'/>
            </div>
            <input type='text' id='id' placeholder='아이디' />
            <span>
              <Icon kinds='cancell' />
            </span>
          </div>
          <div className={$.input_row}>
            <div className={$.icon}>
              <Icon kinds='lock'/>
            </div>
            <input type='password' id='password' placeholder='비밀번호'
              maxLength={16}
            />
          </div>
          <div>
            <Button text='확인'/>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;