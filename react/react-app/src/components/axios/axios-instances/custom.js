import axios from 'axios'

// TODO: We have created custom instance for primary API calls in place of global defaults because what if we need to call different APIs with different base URLs or authentication methods.
// TODO: We can define multiple instances for multiple API servers.

const authFetch = axios.create({
  baseURL: `http://localhost:3008`,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer token`,
  },
})

export default authFetch
