import { ReactNode } from 'react';

export interface ButtonProps {
  text: string | JSX.Element
  onClick?: () => void
  cercle?: boolean
}
