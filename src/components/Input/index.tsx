import React, { ReactNode, useRef } from 'react';
import $ from './input.module.scss'
import classNames from 'classnames/bind';

interface InputProps {
  children?: ReactNode
  focus?: boolean,
  ref?: React.RefObject<HTMLInputElement>
  value: string
  onClick?: () => void,
  onBlur?: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const cx = classNames.bind($)
const Input = ({children, focus, onClick, onBlur, ref, value, onChange}: InputProps) => {  
  return (
    <span className={cx('input_box', 'input_id', focus ? 'focus' : '')} 
      onClick={onClick}
      onBlur={onBlur}>
      <input type='text' name='joinId' id='joinId'
        ref={ref}
        value={value} onChange={onChange}/>
      {children}
    </span>
  )
}

export default Input