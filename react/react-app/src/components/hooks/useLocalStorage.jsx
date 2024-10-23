import React, { useEffect, useState } from 'react'

const useLocalStorage = (key, initialValue) => {
  const localUserName = localStorage.getItem(key)

  const [userName, setUserName] = useState(localUserName ? localUserName : initialValue)

  useEffect(() => {
    localStorage.setItem(key, userName)
  }, [userName, key])

  return [userName, setUserName]
}

export default useLocalStorage
