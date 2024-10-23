import React, { useEffect } from 'react'

const Counter1 = ({ number }) => {
  useEffect(() => {
    console.log(`Functional Counter sub component componentDidMount method: When component render first time.`)

    return () => {
      console.log(`Functional Counter sub component componentWillUnmount method: component removed.`)
    }
  }, [])

  useEffect(() => {
    console.log(`Functional Counter sub component componentDidUpdate method: component updated.`, number)
  }, [number])

  return <div>Functional Component: {number}</div>
}

export default Counter1
