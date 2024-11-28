import axios from 'axios'

const authFetch = axios.create({
  baseURL: `http://localhost:3008`,
  headers: {
    Accept: 'application/json',
    // Authorization: `Bearer token`,
  },
})

authFetch.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = `Bearer token`
    request.headers['interceptor'] = true
    console.log(`Request sent...`)
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

authFetch.interceptors.response.use(
  (response) => {
    console.log(`Response sent...`)
    return response
  },
  (error) => {
    console.error(error.message)
    if (error.response.status === 404) {
      console.log(`Not authorized..!`)
      return Promise.reject(`Not authorized..!`)
    } else if (error.response.status === 404) {
      console.log(`Page not found..!`)
      return Promise.reject(`Page not found..!`)
    }
    return Promise.reject(error)
  },
)

export default authFetch
