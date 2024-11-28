import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountDecrement, accountIncrement, accountIncrementByAmount, getAccount } from '../actions/actions'

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

  const increment = () => {
    dispatch(accountIncrement())
  }
  const decrement = () => {
    dispatch(accountDecrement())
  }
  const incrementByAmount = (amountToIncrease) => (e) => {
    dispatch(accountIncrementByAmount(amountToIncrease))
  }
  const initializeUser = (id) => (e) => {
    dispatch(getAccount(id))
  }

  return (
    <div>
      <div>Account</div>
      <div>Total Amount: {amount}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <input type="number" name="amountToIncrease" id="amountToIncrease" onChange={handleChangeAmount} />
      <button onClick={incrementByAmount(amountToIncrease)}>Increment By Amount</button>
      <br />
      <hr />
      <br />
      <input type="number" name="accountID" id="accountID" onChange={handleChangeAccountID} />
      <button onClick={initializeUser(accountID)}>Initialize User</button>
    </div>
  )
}

export default Account
