import axios from 'axios'

// TODO: Set global default configurations.
// ? But what if we need to call different APIs with different base URLs or authentication methods?
// TODO: Then we can create custom instance for it.

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer token`
axios.defaults.baseURL = `http://localhost:3008`
axios.defaults.timeout = 10000 // * 10 seconds timeout
