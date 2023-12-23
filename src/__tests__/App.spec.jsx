import { render, screen, waitFor } from "@testing-library/react"
import App from "../App.jsx"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import routesConfig from "../routes.jsx"
test('demo', () => {
  expect(true).toBe(true)
})

jest.mock("../services/users", () => {
  return {
    usersService: jest.fn(() => Promise.resolve([]))
  }
})

jest.mock("../services/rooms.js", () => {
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

describe("Test App", () => {
  test("Test App is defined", () => {
    const component = render(
      <App />
    )
    expect(component).toBeDefined()
  })
})



