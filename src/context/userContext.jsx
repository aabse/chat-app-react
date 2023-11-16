import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [data, setData] = useState(undefined)

  useEffect(() => {
    console.log(data?.email)
  }, [data])
  return (
    <UserContext.Provider value={{data, setData}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
