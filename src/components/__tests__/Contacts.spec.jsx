import { fireEvent, render, waitFor, screen } from "@testing-library/react"
import Contacts from "../Contacts/Contacts"
import * as usersService from "../../services/users"
import * as roomsService from "../../services/rooms"
import * as errorUtils from "../../utils/errorManager"
import { UserProvider } from "../../context/userContext"

jest.mock("../../services/users", () => {
  return {
    users: jest.fn(() => Promise.resolve([
      {
        _id: 123,
        email: "test@test.cl"
      }
    ]))
  }
})

jest.mock("../../services/rooms", () => {
  return {
    getRoomsByNames: jest.fn(() => Promise.resolve([
      {
        _id: 123,
        users: [],
        messages: [],
        name: "general"
      }
    ])),
    getRoomByUserId: jest.fn(() => Promise.resolve([
      {
        _id: 12345,
        users: [],
        messages: []
      }
    ])),
  }
})


describe("Test Contacts component", () => {
  test("Test get users", async () => {
    const spyError = jest.spyOn(errorUtils, "showError")
    render(
      <UserProvider>
        <Contacts updateRoomSelected={() => {}} updateRoomName={() => {}} />
      </UserProvider>
    )
    await waitFor(() => expect(spyError).toHaveBeenCalledTimes(0))
  })

  test("Test get users with error", async () => {
    const spyError = jest.spyOn(errorUtils, "showError")
    usersService.users.mockImplementationOnce(() => Promise.reject())
    render(
      <UserProvider>
        <Contacts updateRoomSelected={() => {}} updateRoomName={() => {}} />
      </UserProvider>
    )
    await waitFor(() => expect(spyError).toHaveBeenCalled())
  })

  test("Test select contact", async () => {
    const spyGetRoom = jest.spyOn(roomsService, "getRoomByUserId")
    const component = render(
      <UserProvider>
        <Contacts updateRoomSelected={() => {}} updateRoomName={() => {}} />
      </UserProvider>
    )
    const contactElement = await waitFor(() => component.getByTestId("contact-user-0"))
    fireEvent.click(contactElement)
    await waitFor(() => expect(spyGetRoom).toHaveBeenCalled())
  })
})
