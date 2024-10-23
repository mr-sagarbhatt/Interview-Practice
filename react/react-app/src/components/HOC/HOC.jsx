import React from 'react'
import withAuth from './utils/withAuth'
import withDarkMode from './utils/withDarkMode'

const Dashboard = () => {
  return <div>Dashboard</div>
}

// TODO: 2. or return a HOC component from the component itself.
const NewHOCComponent2 = withDarkMode(withAuth(Dashboard))

const HOC = () => {
  // TODO: Create a new HOC component
  // TODO: 1. Either create it parent component where it is called.
  // TODO: 2. or return a HOC component from the component itself if it is always used with the HOC component.

  // TODO: 1. Either create it parent component where it is called.
  const NewHOCComponent1 = withAuth(Dashboard)

  return (
    <div>
      <div>HOC</div>
      <NewHOCComponent1></NewHOCComponent1>
      <NewHOCComponent2></NewHOCComponent2>
    </div>
  )
}

export default HOC
