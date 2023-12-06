import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'

const UserContext = createContext()

const UserProvider = ({ children }) => {
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

UserProvider.propTypes = {
        children: PropTypes.node.isRequired
}

export { UserContext, UserProvider }
