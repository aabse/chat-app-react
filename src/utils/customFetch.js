export const customFetch = async (...args) => {
  const { fetch: originalFetch } = window;

  let [resource, config] = args
  const response = await originalFetch(resource, config)
  console.log(response) 
  if (response.status === 401) {
    window.location = '/login'
    return Promise.reject(response)
  }

  return response
}
