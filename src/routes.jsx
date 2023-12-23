import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const routesConfig = [
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
]

export default routesConfig
