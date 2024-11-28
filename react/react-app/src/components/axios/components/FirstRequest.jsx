import axios from 'axios'
import { useEffect } from 'react'
// limit, if 429 wait for 15 min and try again
const url = 'http://localhost:3008/users'

const FirstRequest = () => {
  const fetchData = async () => {
    try {
      const response = await axios(url)
      console.log([response])
    } catch (error) {
      console.error(error.response)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return <h2 className="text-center">first request</h2>
}
export default FirstRequest
