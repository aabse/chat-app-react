import { newMessage } from "../messages"
import fetchMock from 'jest-fetch-mock'
describe("Tests service auth", () => {

  test("Test newMessage service", async () => {
    const mockResponse = {
      _id: 123,
      users: [],

    }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    const response = await newMessage(123, "test message")
    expect(response).toEqual(mockResponse)
  })

  test("Test newMessage service with error", async () => {
    const errorResponse = { status: 500 }; // Simulating an error status
    fetchMock.mockOnce(JSON.stringify(errorResponse), { status: errorResponse.status });

    try {
      await newMessage(123, "test message");
    } catch (error) {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(Error);
    }
  });
  
})
