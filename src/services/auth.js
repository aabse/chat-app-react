export const login = async ({email, password}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
      credentials: 'include'
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const signup = async ({email,password}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
      credentials: 'include'
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
