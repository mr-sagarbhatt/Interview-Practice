import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bonusIncrement } from '../actions/actions'

const Bonus = () => {
  const points = useSelector((state) => state?.bonus?.points)
  const dispatch = useDispatch()
  const increment = () => dispatch(bonusIncrement())

  return (
    <div>
      <div>Bonus</div>
      <div>Total Points: {points}</div>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default Bonus
