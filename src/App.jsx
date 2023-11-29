import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { SocketProvider } from './context/socketContext'
import { UserProvider } from './context/userContext'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import './services/interceptor.js'

function App() {
  const isAuthenticated = true

  return (
    <SocketProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={ <Login /> } />
            <Route 
              path={"/login"}
              element={ <Login /> } />
            <Route
              path="/signup"
              element={ <Signup /> } />
            <Route
              path='/home'
              element={ <Home /> } />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </SocketProvider>
  )
}

function PublicRoute({ children }) {
  const isAuth = isAuthenticated()
  return (
    !isAuth ? {children} : <Navigate to={'/home'} />
  )
}

function isAuthenticated() {
  return existCookie('token')
}

function existCookie(name) {
  const regex = new RegExp(`(^| )${name}=([^;]+)`)
  return document.cookie.match(regex)
}

export default App
