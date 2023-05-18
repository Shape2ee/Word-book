import React, { useState } from 'react'
import $ from './darkMode.module.scss'
import Icon from '@components/Icon'


const DarkMode = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false)
  const [themeIcon, setThemeIcon] = useState<string>('light')

  const handleChangeTheme = async () => {
    await setDarkMode(!isDarkMode)
    console.log(isDarkMode)
    if (isDarkMode) {
      setThemeIcon('dark')
      localStorage.setItem('darkmode', 'true')
      document.documentElement.setAttribute('data-theme', 'DARK')
      return
    } 
    setThemeIcon('light')
    localStorage.setItem('darkmode', 'false')
    document.documentElement.setAttribute('data-theme', 'LIGHT')
  }

  return (
    <div className={$.darkMode_btn_wrapper} onClick={handleChangeTheme}>
      <Icon kinds={themeIcon} />
    </div>
  )
}

export default DarkMode