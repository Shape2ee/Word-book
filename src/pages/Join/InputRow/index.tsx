import React, { ReactNode, forwardRef } from "react";
import $ from './inputRow.module.scss'
import classNames from "classnames/bind";
import Icon from "@components/Icon";

const cx = classNames.bind($)
interface InputRowProps {
  children?: ReactNode,
  title: string,
  name: string,
  focus: boolean,
  forwardedRef: any,
  value: string,
  inputType: string,
  confirmBox?: boolean,
  isError?: boolean,
  isPasswordSuccess?: boolean,
  inputId?:boolean,
  onClick: () => void,
  onBlur: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isNoneValue?:boolean,
  isIdDuplication?:boolean,
  isIdError?:boolean,
  isPwError?:boolean,
  isPwSame?:boolean,
}

const InputRow = forwardRef(({
  children,
  title,
  name,
  focus,
  forwardedRef,
  value,
  inputType,
  confirmBox,
  isError,
  isPasswordSuccess,
  inputId,
  onClick,
  onBlur,
  onChange,
  isNoneValue,
  isIdDuplication,
  isIdError,
  isPwError,
  isPwSame
 }: InputRowProps) => {
  return (
    <div className={$.input_row}>
      <h3 className={$.join_title}>
        <label htmlFor={name}>{title}</label>
      </h3>
      <span className={cx('input_box', inputId, focus ? 'focus' : '')} 
        onClick={onClick}
        onBlur={onBlur}>
        <input type={inputType} name={name} id={name}
          ref={forwardedRef}
          value={value} onChange={onChange}/>
        {confirmBox && <span className={cx('confirm_box', isError ? 'error' : isPasswordSuccess ? 'success' : '')}>
          {isError && <span>사용불가</span>}
          {isPasswordSuccess && <span>사용가능</span>}
          <Icon kinds={isError ? 'shieldFillX': 'shieldLock'}/>
        </span>}
      </span>
      {isNoneValue && <span className={$.error_title}>필수 정보입니다.</span>}
      {isIdDuplication && <span className={$.error_title}>이미 사용중인 아이디입니다.</span>}
      {isIdError && <span className={$.error_title}>5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>}
      {isPwError && <span className={$.error_title}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>}
      {isPwSame && <span className={$.error_title}>비밀번호가 일치하지 않습니다.</span>}
      {/* {children} */}
    </div>
  )
})

export default InputRow