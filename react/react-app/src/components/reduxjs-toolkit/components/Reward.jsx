import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '../reducers/rewardReducer'

const Reward = () => {
  const points = useSelector((state) => state?.reward?.points)
  const dispatch = useDispatch()
  const incrementReward = () => dispatch(increment())
  const decrementReward = () => dispatch(decrement())

  const [amountToIncrease, setAmountToIncrease] = useState(0)
  const handleChangeAmount = (e) => {
    setAmountToIncrease(+e?.target?.value || 0)
  }
  const accountIncrementByAmount = (amountToIncrease) => (e) => {
    dispatch(incrementByAmount(amountToIncrease))
  }
  return (
    <div>
      <div>Reward</div>
      <div>Total Points: {points}</div>
      <button onClick={incrementReward}>Increment</button>
      <button onClick={decrementReward}>Decrement</button>
      <input type="number" name="amountToIncrease" id="amountToIncrease" onChange={handleChangeAmount} />
      <button onClick={accountIncrementByAmount(amountToIncrease)}>Increment By Amount</button>
    </div>
  )
}

export default Reward
