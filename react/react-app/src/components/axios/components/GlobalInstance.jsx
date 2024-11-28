import axios from 'axios'
import { useEffect } from 'react'

const usersUrl = 'http://localhost:3008/users'
const randomUserUrl = 'https://randomuser.me/api'

const GlobalInstance = () => {
  const fetchData = async () => {
    try {
      // const { data } = await axios('/users') // TODO: If we have set global baseUrl.
      const { data } = await axios(usersUrl)
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

  return <h2 className="text-center">global instance</h2>
}
export default GlobalInstance
