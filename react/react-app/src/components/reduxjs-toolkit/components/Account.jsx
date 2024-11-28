import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount, getAccount } from '../slices/accountSlice'

const Account = () => {
  const [amountToIncrease, setAmountToIncrease] = useState()
  const handleChangeAmount = (e) => {
    setAmountToIncrease(+e?.target?.value || 0)
  }

  const [accountID, setAccountID] = useState(1)
  const handleChangeAccountID = (e) => {
    setAccountID(+e?.target?.value || 1)
  }

  const amount = useSelector((state) => state?.account?.amount)
  const dispatch = useDispatch()

  const incrementAmount = () => {
    dispatch(increment())
  }
  const decrementAmount = () => {
    dispatch(decrement())
  }
  const accountIncrementByAmount = (amountToIncrease) => (e) => {
    dispatch(incrementByAmount(amountToIncrease))
  }
  const initializeUser = (id) => (e) => {
    dispatch(getAccount(id))
  }

  return (
    <div>
      <div>Account</div>
      <div>Total Amount: {amount}</div>
      <button onClick={incrementAmount}>Increment</button>
      <button onClick={decrementAmount}>Decrement</button>
      <input type="number" name="amountToIncrease" id="amountToIncrease" onChange={handleChangeAmount} />
      <button onClick={accountIncrementByAmount(amountToIncrease)}>Increment By Amount</button>
      <br />
      <hr />
      <br />
      <input type="number" name="accountID" id="accountID" onChange={handleChangeAccountID} />
      <button onClick={initializeUser(accountID)}>Initialize User</button>
    </div>
  )
}

export default Account
