export const getRoom = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rooms?user=${id}`, {
      credentials: 'include'
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const getRoomsByNames = async (names) => {
  try {
    const roomsStr = names.join(',')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rooms?names=${roomsStr}`, {
      credentials: 'include'
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
