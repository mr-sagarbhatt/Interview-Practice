import { useState } from 'react'
import axios from 'axios'

const url = 'https://icanhazdadjoke.com/'
// Accept : 'application/json'

const Headers = () => {
  const [joke, setJoke] = useState('random dad joke')

  const fetchDadJoke = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: { Accept: 'application/json' }, // TODO: Set required headers for API, For ex: Here we need the data in json format.
      })
      console.log({ data })
      setJoke(data?.joke || '')
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <section className="section text-center">
      <button className="btn" onClick={fetchDadJoke}>
        random joke
      </button>
      <p className="dad-joke">{joke}</p>
    </section>
  )
}
export default Headers
