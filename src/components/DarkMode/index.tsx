import React from 'react'
import $ from './darkMode.module.scss'
import Icon from '@components/Icon'


const DarkMode = () => {
  return (
    <div className={$.darkMode_btn_wrapper}>
      <Icon kinds='light'/>
    </div>
  )
}

export default DarkMode