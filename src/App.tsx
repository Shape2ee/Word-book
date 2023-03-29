import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RouterInfo } from './Router'

const RouterObject = createBrowserRouter(RouterInfo)

function App() {
  return (
    <div className="App">
      <RouterProvider router={RouterObject} />
    </div>
  )
}

export default App
