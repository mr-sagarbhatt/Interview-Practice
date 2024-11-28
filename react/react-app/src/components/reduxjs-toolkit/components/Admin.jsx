import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount, getAccount } from '../slices/accountSlice'
import {
  useGetAccountsQuery,
  useAddAccountMutation,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} from '../api/adminSlice'

const Admin = () => {
  const { data, error, isLoading, isSuccess } = useGetAccountsQuery()
  const [addAccount, addAccountRes] = useAddAccountMutation()
  const [deleteAccount, deleteAccountRes] = useDeleteAccountMutation()
  const [updateAccount, updateAccountRes] = useUpdateAccountMutation()

  //   const [amountToIncrease, setAmountToIncrease] = useState()
  //   const handleChangeAmount = (e) => {
  //     setAmountToIncrease(+e?.target?.value || 0)
  //   }

  //   const [accountID, setAccountID] = useState(1)
  //   const handleChangeAccountID = (e) => {
  //     setAccountID(+e?.target?.value || 1)
  //   }

  //   const amount = useSelector((state) => state?.account?.amount)
  //   const dispatch = useDispatch()

  //   const incrementAmount = () => {
  //     dispatch(increment())
  //   }
  //   const decrementAmount = () => {
  //     dispatch(decrement())
  //   }
  //   const accountIncrementByAmount = (amountToIncrease) => (e) => {
  //     dispatch(incrementByAmount(amountToIncrease))
  //   }
  //   const initializeUser = (id) => (e) => {
  //     dispatch(getAccount(id))
  //   }

  return (
    <div>
      <div>Admin</div>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      {isSuccess
        ? data.map((account) => (
            <p>
              {account?.id}: {account?.amount}{' '}
              <button
                onClick={() =>
                  updateAccount({
                    id: account?.id,
                    amount: 500,
                  })
                }
              >
                Update amount to 500
              </button>{' '}
              <button onClick={() => deleteAccount(account?.id)}>Delete account</button>
            </p>
          ))
        : null}
      {isSuccess ? (
        <button
          onClick={() =>
            addAccount({
              id: String(data?.length + 1),
              amount: 100,
            })
          }
        >
          Add account with amount 100
        </button>
      ) : null}
      {/* <div>Total Amount: {amount}</div>
      <button onClick={incrementAmount}>Increment</button>
      <button onClick={decrementAmount}>Decrement</button>
      <input type="number" name="amountToIncrease" id="amountToIncrease" onChange={handleChangeAmount} />
      <button onClick={accountIncrementByAmount(amountToIncrease)}>Increment By Amount</button>
      <br />
      <hr />
      <br />
      <input type="number" name="accountID" id="accountID" onChange={handleChangeAccountID} />
      <button onClick={initializeUser(accountID)}>Initialize User</button> */}
    </div>
  )
}

export default Admin
