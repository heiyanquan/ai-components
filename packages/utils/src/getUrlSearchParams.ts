export const getUrlSearchParams = (key: string, url = '') => {
  let query = url
  if (!url) {
    query = window.location.search.slice(1)
  } else {
    if (url.includes('?')) {
      const index = url.indexOf('?')
      query = url.slice(index + 1)
    }
  }
  const searchParams = new URLSearchParams(query)
  return searchParams.get(key)
}
