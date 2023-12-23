/* eslint-disable react/prop-types */
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import routesConfig from "../../routes"
import { SocketProvider } from "../../context/socketContext"
import { UserProvider } from "../../context/userContext"
import { fireEvent, render, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import { getRoomsByNames } from "../../services/rooms"

jest.mock("../../services/rooms.js", () => {
  return {
    getRoomsByNames: jest.fn(() => Promise.resolve([
      {
        _id: 123,
        users: [],
        messages: [],
        name: "general"
      }
    ])),
    getRoomsById: jest.fn(() => Promise.resolve([
      {
        _id: 12345,
        users: [],
        messages: []
      }
    ])),
  }
})

const roomName = "room-test"
const roomSelected = {
  _id: 123,
  users: [],
  messages: []
}

jest.mock("../../components/Rooms/Rooms.jsx", () => {
  const Rooms = ({updateRoomName, updateRoomSelected}) => {
    const selectRoom = () => {
      updateRoomName(roomName)
      updateRoomSelected(roomSelected)
    }
    return (
      <div>
        <button data-testid="button-select-room-test" onClick={selectRoom}>Select room</button>
      </div>
    )
  }
  return Rooms
})

jest.mock("../../components/Contacts/Contacts.jsx", () => {
  const Contacts = ({updateRoomName, updateRoomSelected}) => {
    const selectRoom = () => {
      updateRoomName(roomName)
      updateRoomSelected(roomSelected)
    }
    return (
      <div>
        <button data-testid="button-select-room-contact-test" onClick={selectRoom}>Select room</button>
      </div>
    )
  }
  return Contacts
})

jest.mock("../../components/Chat/Chat.jsx", () => {
  const Chat = ({room, roomName, active, updateChatActive}) => {
    const handleBackButton = () => {
      updateChatActive(false)
    }

    return (
      <div data-testid="chat-wrapper-test" className={'wrapper-chat ' + (active? 'active':'inactive')}>
        <h1>{roomName}</h1>
        <h2>{active? 'active': 'inactive'}</h2>
        <button data-testid="chat-button-back-test" onClick={handleBackButton}>Back Test</button>
        <ul>
          {room?.messages.map((msg,key) => (
            <li key={key}>{msg.message}</li>
          ))}
        </ul>
      </div>
    )
  }
  return Chat
})

let component, router

describe("Tests Home page", () => {
  
  test("Test route home", async () => {
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/home"]
    })

    component = render(
      <SocketProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </SocketProvider>
    )

    await waitFor(() => expect(router.state.location.pathname).toBe("/home"))
  })

  test("Test service rooms with 401 error", () => {
    const mockResponse = { status: 401 }
    getRoomsByNames.mockImplementation(mockResponse)
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/home"]
    })

    component = render(
      <SocketProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </SocketProvider>
    )

  })

  test("Test select room", async () => {
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/home"]
    })

    component = render(
      <SocketProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </SocketProvider>
    )

    const button = component.queryByTestId("button-select-room-test") 
    fireEvent.click(button)
    const wrapperChat = component.queryByTestId("chat-wrapper-test")
    await waitFor(() => expect(wrapperChat).toHaveTextContent("active"))
  })

  test("Test update chat active", async () => {
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/home"]
    })

    component = render(
      <SocketProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </SocketProvider>
    )

    const buttonSelectRoom = component.queryByTestId("button-select-room-test") 
    fireEvent.click(buttonSelectRoom)

    const button = component.queryByTestId("chat-button-back-test")
    fireEvent.click(button)
    const wrapperChat = component.queryByTestId("chat-wrapper-test")
    await waitFor(() => expect(wrapperChat).toHaveTextContent("inactive"))
  })

})

