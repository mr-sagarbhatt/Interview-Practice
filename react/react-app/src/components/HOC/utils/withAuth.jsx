import React from 'react'

const withAuth = (Component) => {
  // TODO: Authentication Logic.
  const isAuthenticated = true
  return (props) => {
    // TODO: Enhancing the component and return a new component.
    if (!isAuthenticated) return <p>Please login to get access.</p>
    return <Component {...props}></Component>
  }
}

export default withAuth
