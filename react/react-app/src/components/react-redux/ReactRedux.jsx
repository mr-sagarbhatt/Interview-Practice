import React from 'react'
import { Account, Bonus } from './components'
import { bankStore } from './store/bank-store'
import { useSelector } from 'react-redux'

const ReactRedux = () => {
  const amount = useSelector((state) => state?.account?.amount)
  const points = useSelector((state) => state?.bonus?.points)
  const account = useSelector((state) => state.account)

  return (
    <div>
      <div>React Redux</div>
      {account?.pending ? (
        <div>loading...</div>
      ) : account?.error ? (
        <div style={{ color: 'red' }}>{account?.error}</div>
      ) : (
        <div>Current Amount: {amount}</div>
      )}

      <div>Total Bonus: {points}</div>

      <br />
      <hr />
      <br />
      <Account></Account>
      <br />
      <hr />
      <br />
      <Bonus></Bonus>
    </div>
  )
}

export default ReactRedux
