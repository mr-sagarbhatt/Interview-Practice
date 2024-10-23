import React, { createContext, useContext, useEffect, useState } from 'react'

// TODO: step 1. Creating the context.
export const AppContext = createContext()

// TODO: step 3. Consuming the context in the component by calling the function.
export const useAppContext = () => useContext(AppContext)

// TODO: step 1. Creating Provider for the component.
const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true' ? true : false,
  )
  console.log({ isAuthenticated })

  const store = {
    method: 'context',
    isAuthenticated,
    login: () => {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', true)
    },
    logout: () => {
      setIsAuthenticated(false)
      localStorage.setItem('isAuthenticated', false)
    },
  }
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}

// TODO: step 2. Consuming the context in the component. We will use this component in the main component as a wrapper the pass data to all the child.
export default AppProvider
