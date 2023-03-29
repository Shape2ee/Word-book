import Layout from '@pages/Layout'
import Main from '@pages/Main'
import WordTest from '@pages/WordTest'

export const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    children: [
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
  },
]