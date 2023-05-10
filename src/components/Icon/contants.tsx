import { 
  BsSearch,
  BsPlus,
  BsCalendarDate,
  BsCheckCircle,
  BsCheckCircleFill,
  BsCheck,
  BsJournalBookmark, 
  BsPencil,
  BsChevronLeft,
  BsThreeDotsVertical,
  BsX,
  BsPerson,
  BsLock,
  BsCheckSquare,
  BsCheckSquareFill,
  BsArrowClockwise
} from "react-icons/bs";

interface IconButtonList {
  kinds: string;
  element: JSX.Element;
}

export const ICON_BUTTON_LIST: IconButtonList[] = [
  {
    kinds: 'search',
    element: <BsSearch />
  },
  {
    kinds: 'add',
    element: <BsPlus />
  },
  {
    kinds: 'date',
    element: <BsCalendarDate />
  },
  {
    kinds: 'noneChecked',
    element: <BsCheckCircle />
  },
  {
    kinds: 'checked',
    element: <BsCheckCircleFill />
  },
  {
    kinds: 'checkLine',
    element: <BsCheck />
  },
  {
    kinds: 'note',
    element: <BsJournalBookmark />
  },
  {
    kinds: 'test',
    element: <BsPencil />
  },
  {
    kinds: 'back',
    element: <BsChevronLeft />
  },
  {
    kinds: 'edit',
    element: <BsThreeDotsVertical />
  },
  {
    kinds: 'cancell',
    element: <BsX />
  },
  {
    kinds: 'user',
    element: <BsPerson />
  },
  {
    kinds: 'lock',
    element: <BsLock />
  },
  {
    kinds: 'checkboxLine',
    element: <BsCheckSquare />
  },
  {
    kinds: 'checkboxFill',
    element: <BsCheckSquareFill />
  },
  {
    kinds: 'reset',
    element: <BsArrowClockwise />
  },
]