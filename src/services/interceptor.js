const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
  let [resource, config] = args
  const response = await originalFetch(resource, config)
  if (response.status === 401) {
    window.location = '/login'
    return Promise.reject(response)
  }

  return response
}
