export const usersService = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, 
    {
      credentials: 'include'
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
