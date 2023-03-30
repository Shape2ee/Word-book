import Layout from '@pages/Layout'
import Main from '@pages/Main'
import WordTest from '@pages/WordTest'

export const RoutePage = [
  {
    index: true,
    element: <Main />,
    label: '메인 홈'
  },
  {
    path: '/test',
    element: <WordTest />,
    label: '단어 시험'
  },
]

export const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    children: RoutePage
  },
]

