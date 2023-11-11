import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SocketProvider } from './context/socketContext'
import { UserProvider } from './context/userContext'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

function App() {

  return (
    <SocketProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login"
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

export default App
