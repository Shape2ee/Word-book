import { ReactNode } from 'react';

export interface ButtonProps {
  children?: JSX.Element
  text?: string
  onClick?: () => void
  cercle?: boolean
  fill?: boolean  
}
