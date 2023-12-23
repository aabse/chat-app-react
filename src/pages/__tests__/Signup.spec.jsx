import { RouterProvider, createMemoryRouter } from "react-router-dom"
import routesConfig from "../../routes"
import { SocketProvider } from "../../context/socketContext"
import { UserProvider } from "../../context/userContext"
import { fireEvent, render, waitFor } from "@testing-library/react"
import { signup } from "../../services/auth"
import userEvent from "@testing-library/user-event"

jest.mock("../../services/auth", () => (
  {
    signup: jest.fn()   
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

describe('Signup page tests', () => {

  beforeEach(() => {
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/signup"]
    })

    component = render(
      <SocketProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </SocketProvider>
    )
  })

  test("Test signup with valid form", async () => {
    signup.mockImplementation(() => 
      Promise.resolve({
        id: 1234,
        email: "test@test.com"
      })
    )
    await userEvent.type(component.queryByTestId("signup-email-input"), "asd@asd.cl")
    await userEvent.type(component.queryByTestId("signup-password-input"), "123456")
    await userEvent.type(component.queryByTestId("signup-passwordConfirm-input"), "123456")
    const button = component.queryByTestId("signup-submit")
    fireEvent.click(button)
    await waitFor(() => expect(router.state.location.pathname).toBe("/home"))
  })

  test("Test signup without email", async () => {
    await userEvent.type(component.queryByTestId("signup-password-input"), "123456")
    await userEvent.type(component.queryByTestId("signup-passwordConfirm-input"), "123456")
    const button = component.queryByTestId("signup-submit")
    fireEvent.click(button)
    await waitFor(() => expect(component.getByTestId("signup-email-error")).toBeDefined())
  })

  test("Test signup without password", async () => {
    await userEvent.type(component.queryByTestId("signup-email-input"), "asd@asd.cl")
    const button = component.queryByTestId("signup-submit")
    fireEvent.click(button)
    await waitFor(() => expect(component.getByTestId("signup-password-error")).toBeDefined())
  })

  test("Test signup with not equal passwords", async () => {
    await userEvent.type(component.queryByTestId("signup-email-input"), "asd@asd.cl")
    await userEvent.type(component.queryByTestId("signup-password-input"), "123456")
    await userEvent.type(component.queryByTestId("signup-passwordConfirm-input"), "12345678")
    const button = component.queryByTestId("signup-submit")
    fireEvent.click(button)
    await waitFor(() => expect(component.getByTestId("signup-passwordConfirm-error")).toBeDefined())
  })

  test("Test signup with server error", async () => {
    signup.mockImplementation(() => 
      Promise.reject()
    )
    await userEvent.type(component.queryByTestId("signup-email-input"), "asd@asd.cl")
    await userEvent.type(component.queryByTestId("signup-password-input"), "123456")
    await userEvent.type(component.queryByTestId("signup-passwordConfirm-input"), "123456")
    const button = component.queryByTestId("signup-submit")
    fireEvent.click(button)
    await waitFor(() => expect(router.state.location.pathname).toBe("/signup"))

  })
})
