import { fireEvent, render, waitFor } from "@testing-library/react"
import Rooms from "../Rooms/Rooms"
import * as roomsService from "../../services/rooms"
import * as errorUtils from "../../utils/errorManager"

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
    getRoomById: jest.fn(() => Promise.resolve(
      {
        _id: 12345,
        users: [],
        messages: []
      })),
  }
})

describe("Rooms component tests", () => {

  test("Test get rooms with error", async () => {
    const spyError = jest.spyOn(errorUtils, "showError")
    roomsService.getRoomsByNames.mockImplementationOnce(() => Promise.reject())
    render(<Rooms updateRoomName={() => {}} updateRoomSelected={() => {}} />)
    await waitFor(() => expect(spyError).toHaveBeenCalled())
  })

  test("Test select room", async () => {
    const spyGetRoom = jest.spyOn(roomsService, "getRoomById")
    const component = render(<Rooms updateRoomName={() => {}} updateRoomSelected={() => {}} />)
    const roomElement = await waitFor(() => component.getByTestId("room-0"))
    fireEvent.click(roomElement)
    await waitFor(() => expect(spyGetRoom).toHaveBeenCalled())

  })
})
