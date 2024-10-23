import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  if (count > 5) {
    throw new Error('Crashed..!')
  }

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
    </div>
  )
}

export default Counter
