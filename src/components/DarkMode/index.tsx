import React, { useEffect, useState } from 'react'
import $ from './darkMode.module.scss'
import Button from '@components/Button'
import Icon from '@components/Icon'


const DarkMode = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false)
  const [themeIcon, setThemeIcon] = useState<string>('light')

  const handleSetTheme = (isDarkMode: boolean) => {
    if (isDarkMode) {
      setDarkMode(true)
      setThemeIcon('dark')
      localStorage.setItem('Dark', 'true')
      document.documentElement.setAttribute('data-theme', 'DARK')
      return
    }
    setDarkMode(false)
    setThemeIcon('light')
    localStorage.setItem('Dark', 'false')
    document.documentElement.setAttribute('data-theme', 'LIGHT')
  }

  const handleCheckTheme = async () => {
    const osTheme = await window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (osTheme) {
      handleSetTheme(osTheme)
      return
    }
    const theme = await localStorage.getItem('Dark')
    handleSetTheme(theme === 'true')
  }

  useEffect(() => {
    handleCheckTheme()
  },[])

  const handleChangeTheme = async () => {
    await setDarkMode(!isDarkMode)
    console.log(isDarkMode)
    handleSetTheme(!isDarkMode)
  }

  return (
    <div className={$.darkMode_btn_wrapper} onClick={handleChangeTheme}>
      <Icon kinds={themeIcon} />
    </div>
  )
}

export default DarkMode