import React from 'react'
import './icon.module.scss'
import { ICON_BUTTON_LIST } from '../Icon/contants'

const Icon = ({ kinds }: { kinds: string }) => {
  const iconBtn = ICON_BUTTON_LIST.filter((iconBtn) => iconBtn.kinds === kinds)[0]
  return (
    <>{iconBtn.element}</>
  )
};

export default Icon;