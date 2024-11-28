import { useEffect } from 'react'
// TODO: We have created custom instance for primary API calls in place of global defaults because what if we need to call different APIs with different base URLs or authentication methods.
// TODO: We can define multiple instances for multiple API servers.
import authFetch from '../axios-instances/custom' // TODO: For main APIs
import axios from 'axios' // TODO: For other APIs

const randomUserUrl = 'https://randomuser.me/api'

const CustomInstance = () => {
  const fetchData = async () => {
    try {
      const { data } = await authFetch('/users')
      console.log({ data })

      const { data: randomUser } = await axios(randomUserUrl)
      console.log({ randomUser })
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <h2 className="text-center">custom instance</h2>
}
export default CustomInstance
