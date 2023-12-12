import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { SocketProvider } from './context/socketContext'
import { UserProvider } from './context/userContext'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import './services/interceptor.js'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/home",
      element: <Home />
    }
  ])

  return (
    <SocketProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SocketProvider>
  )
}

export default App
