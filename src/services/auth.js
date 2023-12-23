import { customFetch } from "../utils/customFetch"

export const login = async ({email, password}) => {
  try {
    const response = await customFetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
      credentials: 'include'
    })
    if (response.ok) return response.json()
    const errorMessage = `An error has occured: ${response.status}`
    throw new Error(errorMessage)
  } catch (error) {
    return error
  }
}

export const signup = async ({email,password}) => {
  try {
    const response = await customFetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
      credentials: 'include'
    })
    if (response.ok) return response.json()
    const errorMessage = `An error has occured: ${response.status}`
    throw new Error(errorMessage)
  } catch (error) {
    return error
  }
}
