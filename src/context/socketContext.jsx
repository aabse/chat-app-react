import { createContext } from "react";
import { io } from "socket.io-client";
import PropTypes from 'prop-types'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const URL = import.meta.env.VITE_NODE_ENV === 'production' ? undefined : import.meta.env.VITE_API_URL

  const socket = io(URL)
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

SocketProvider.propTypes = {
        children: PropTypes.node.isRequired
}

export { SocketContext, SocketProvider }
