import Layout from '@pages/Layout'
import Main from '@pages/Main'
import WordTest from '@pages/WordTest'
import AddWord from '@pages/AddWord'

export const RoutePage = [
  {
    index: true,
    element: <Main />,
    label: '단어 노트'
  },
  {
    path: '/test',
    element: <WordTest />,
    label: '단어 시험'
  },
  {
    path: '/add',
    element: <AddWord />,
    label: '단어 추가'
  },
]

export const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    children: RoutePage
  },
]

