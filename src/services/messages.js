export const newMessage = async (roomId, message) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({roomId,message}),
      credentials: 'include'
    })
    if (response.ok) return response.json()
    const errorMessage = `An error has occured: ${response.status}`
    throw new Error(errorMessage)
  } catch (error) {
    return error
  }
}
