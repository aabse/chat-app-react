import { customFetch } from "../customFetch";

describe("Tests customFetch", () => {

  let originalFetch
  let mockAssign

  beforeEach(() => {
    originalFetch = window.fetch
    mockAssign = jest.fn();
    delete window.location; // Deleting window.location to redefine it as a mock object
    window.location = { assign: mockAssign };
  })

  afterEach(() => {
    window.fetch = originalFetch
  });

  test("Test 401 error", async () => {
    const mockResponse = { status: 401 }
    const mockFetch = jest.fn().mockResolvedValue(mockResponse)
    window.fetch = mockFetch

    try {
      await customFetch('/some/resource', { method: 'GET' });
    } catch (error) {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(window.location).toBe('/login');
      expect(error).toEqual(mockResponse);
    }
  })
})
