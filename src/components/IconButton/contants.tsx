import { BiSearch, BiPlus } from 'react-icons/bi'

interface IconButtonList {
  text: string;
  element: JSX.Element;
}

export const ICON_BUTTON_LIST: IconButtonList[] = [
  {
    text: 'search',
    element: <BiSearch />
  },
  {
    text: 'add',
    element: <BiPlus />
  },
]