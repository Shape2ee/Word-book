import React from 'react'
import $ from './resetButton.module.scss'
import Icon from '@components/Icon'

interface ResetButtonProps {
  icon: string
  onClick: (e: React.MouseEvent) => void
}

const ResetButton = ({ icon, onClick }: ResetButtonProps) => {
  return (
    <span className={$.reset_button} onClick={onClick}>
      <Icon kinds={icon} />
    </span>
  )
}

export default ResetButton