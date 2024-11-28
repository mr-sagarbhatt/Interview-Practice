import React from 'react'
import { Account, Bonus, Reward, Admin } from './components'
import { useSelector } from 'react-redux'

const ReduxToolkit = () => {
  const amount = useSelector((state) => state?.account?.amount)
  const points = useSelector((state) => state?.bonus?.points)
  const account = useSelector((state) => state.account)
  const reward = useSelector((state) => state.reward?.points)

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
      <div>Total Reward: {reward}</div>
      <br />
      <hr />
      <br />
      <Account></Account>
      <br />
      <hr />
      <br />
      <Bonus></Bonus>
      <br />
      <hr />
      <br />
      <Reward></Reward>
      <br />
      <hr />
      <br />
      <Admin></Admin>
    </div>
  )
}

export default ReduxToolkit
