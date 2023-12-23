import { login, signup } from "../auth"
import fetchMock from 'jest-fetch-mock'
describe("Tests service auth", () => {

  test("Test login service", async () => {
    const mockResponse = {
      _id: 123,
      email: "test@test.cl"
    }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    const response = await login({email: 'test@test.cl', password: '12345'})
    expect(response).toEqual(mockResponse)
  })

  test("Test login with error", async () => {
    const errorResponse = { status: 500 }; // Simulating an error status
    fetchMock.mockOnce(JSON.stringify(errorResponse), { status: errorResponse.status });

    const credentials = { email: 'test@example.com', password: 'password' };

    try {
      await login(credentials);
    } catch (error) {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(Error);
    }
  });
  
  test("Test signup service", async () => {
    const mockResponse = {
      _id: 123,
      email: "test@test.cl"
    }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    const response = await signup({email: 'test@test.cl', password: '12345'})
    expect(response).toEqual(mockResponse)
  })

  test("Test signup with error", async () => {
    const errorResponse = { status: 500 }; // Simulating an error status
    fetchMock.mockOnce(JSON.stringify(errorResponse), { status: errorResponse.status });

    const credentials = { email: 'test@example.com', password: 'password' };

    try {
      await signup(credentials);
    } catch (error) {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(Error);
    }
  });

})
