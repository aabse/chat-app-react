import { createContext, useState } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  return (
    <UserContext.Provider value={{email, setEmail}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
