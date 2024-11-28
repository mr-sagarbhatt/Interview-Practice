import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../slices/bonusSlice'

const Bonus = () => {
  const points = useSelector((state) => state?.bonus?.points)
  const dispatch = useDispatch()
  const incrementBonus = () => dispatch(increment())

  return (
    <div>
      <div>Bonus</div>
      <div>Total Points: {points}</div>
      <button onClick={incrementBonus}>Increment</button>
    </div>
  )
}

export default Bonus
