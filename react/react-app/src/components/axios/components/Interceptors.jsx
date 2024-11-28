import { useEffect } from 'react'
import authFetch from '../axios-instances/interceptor'

const url = 'https://course-api.com/react-store-products'

const Interceptors = () => {
  console.log('axios interceptors')
  const fetchData = async () => {
    try {
      const { data } = await authFetch('/users')
      console.log({ data })
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <h2 className="text-center">interceptors</h2>
}
export default Interceptors
