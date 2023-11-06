import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

function App() {

  return (
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
  )
}

export default App
