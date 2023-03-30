import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RouterInfo } from './Router'
import '@styles/reset.scss'
import '@styles/theme.scss'

const RouterObject = createBrowserRouter(RouterInfo)

function App() {
  return (
    <div className="container">
      <RouterProvider router={RouterObject} />
    </div>
  )
}

export default App
