import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { SocketProvider } from './context/socketContext'
import { UserProvider } from './context/userContext'
import routesConfig from './routes'

function App() {

  const router = createBrowserRouter(routesConfig)

  return (
    <SocketProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SocketProvider>
  )
}

export default App
