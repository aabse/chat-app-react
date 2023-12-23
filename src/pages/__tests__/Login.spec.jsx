import { fireEvent, render, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { UserProvider } from "../../context/userContext"
import { SocketProvider } from "../../context/socketContext"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import routesConfig from "../../routes"
import { login } from "../../services/auth.js"

jest.mock("../../services/auth", () => (
  {
    login: jest.fn()
  }
))

jest.mock("../../services/users", () => {
  return {
    users: jest.fn(() => Promise.resolve([]))
  }
})

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

let component, router

describe('Login test', () => {

  beforeEach(() => {
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/login"]
    })

    component = render(
      <SocketProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </SocketProvider>)
  })

  test("Test login with valid credentials", async () => {
    login.mockImplementation(() =>
      Promise.resolve({
        id: 1234,
        email: "test@test.com"
      }))
    await userEvent.type(component.queryByTestId("login-email-input"), "asd@asd.cl")
    await userEvent.type(component.queryByTestId("login-password-input"), "12345678")
    const button = component.queryByTestId("login-submit")
    fireEvent.click(button)
    await waitFor(() => expect(router.state.location.pathname).toBe("/home"))
  })

  test("Test login with invalid credentials", async () => {
    login.mockImplementation(() =>
      Promise.reject())
    await userEvent.type(component.queryByTestId("login-email-input"), "asd@asd.cl")
    await userEvent.type(component.queryByTestId("login-password-input"), "12345678")
    const button = component.queryByTestId("login-submit")
    fireEvent.click(button)
    await waitFor(() => expect(router.state.location.pathname).toBe("/login"))
  })
})


