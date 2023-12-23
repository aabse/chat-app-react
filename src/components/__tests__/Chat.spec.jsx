import { fireEvent, render, waitFor } from "@testing-library/react"
import { SocketProvider } from "../../context/socketContext"
import { UserProvider } from "../../context/userContext"
import Chat from "../Chat/Chat"
import { newMessage } from "../../services/messages"
import * as errorUtils from "../../utils/errorManager"
import io from 'socket.io-client';
import '@testing-library/jest-dom'

jest.mock("../../services/messages", () => {
  return {
    newMessage: jest.fn(() => Promise.resolve())
  }
})

jest.mock("socket.io-client")

let component
const room = {
  _id: 123,
  users: [],
  messages: [
    {
      user: 12345,
      message: "message test",
      createdAt: "12-12-2023"
    }
  ]
}
const roomName = "test room"

const mockUpdateChatActive = jest.fn()

const renderChat = (chatActive) => {
  const mockSocket = {
      on: jest.fn((event, callback) => {
        callback()
      }),
      disconnect: jest.fn(),
      off: jest.fn()
    }

    io.mockImplementation(() => mockSocket)

    component = render(
      <SocketProvider>
        <UserProvider>
          <Chat room={room} roomName={roomName} active={chatActive} updateChatActive={mockUpdateChatActive} />
        </UserProvider>
      </SocketProvider>
    )
}

describe("Test Chat component", () => {
  
  test("Test back button", async () => {
    renderChat(true)
    const backButton = component.queryByTestId("chat-backButton")
    fireEvent.click(backButton)
    await waitFor(() => expect(mockUpdateChatActive).toHaveBeenCalled())
  })

  test("Test new message", async () => {
    renderChat(true)
    const inputNewMessage = component.queryByTestId("chat-newMessage")
    fireEvent.change(inputNewMessage, {target: {value: "test"}})
    const buttonSendMessage = component.queryByTestId("chat-sendMessage")
    fireEvent.click(buttonSendMessage)
    await waitFor(() => expect(inputNewMessage).toHaveDisplayValue(""))
  })

  test("Test new message with service error", async () => {
    renderChat(true)
    const spyError = jest.spyOn(errorUtils, "showError")
    newMessage.mockImplementationOnce(() => Promise.reject())
    const inputNewMessage = component.queryByTestId("chat-newMessage")
    fireEvent.change(inputNewMessage, {target: {value: "test"}})
    const buttonSendMessage = component.queryByTestId("chat-sendMessage")
    fireEvent.click(buttonSendMessage)
    await waitFor(() => expect(inputNewMessage).toHaveDisplayValue("test"))
    expect(spyError).toHaveBeenCalled()
  })

  test("Test render inactive chat", () => {
    renderChat(false)
    const elementChat = component.queryByTestId("wrapper-chat")
    expect(elementChat).toHaveClass("inactive")
  })
})
