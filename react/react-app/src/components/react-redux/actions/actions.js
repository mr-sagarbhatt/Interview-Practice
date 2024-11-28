import axios from 'axios'

// * 1) ACTIONS TYPES
// ? INCREMENT_BY_AMOUNT type is same for both account and bonus so that if amount is changed points are also changes.
export const ACCOUNT_ACTIONS = {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',
  incrementByAmount: 'INCREMENT_BY_AMOUNT',
  accountFulfilled: 'ACCOUNT_FULFILLED',
  accountRejected: 'ACCOUNT_REJECTED',
  accountPending: 'ACCOUNT_PENDING',
}
export const BONUS_ACTIONS = {
  increment: 'BONUS_INCREMENT',
  decrement: 'BONUS_DECREMENT',
  incrementByAmount: 'INCREMENT_BY_AMOUNT',
}

// * 2) ACTIONS CREATORS
export const bonusIncrement = () => {
  return { type: BONUS_ACTIONS?.increment }
}

export const accountIncrement = () => {
  return { type: ACCOUNT_ACTIONS?.increment }
}
export const accountDecrement = () => {
  return { type: ACCOUNT_ACTIONS?.decrement }
}
export const accountIncrementByAmount = (payload) => {
  return { type: ACCOUNT_ACTIONS.incrementByAmount, payload }
}
export const accountFulfilled = (payload) => {
  return { type: ACCOUNT_ACTIONS.accountFulfilled, payload }
}
export const accountRejected = (error) => {
  return { type: ACCOUNT_ACTIONS.accountRejected, error }
}
export const accountPending = () => {
  return { type: ACCOUNT_ACTIONS.accountPending }
}
export const getAccount = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(accountPending())
      const { data } = await axios.get(`http://localhost:3008/accounts/${id}`)
      dispatch(accountFulfilled(data?.amount))
    } catch (error) {
      dispatch(accountRejected(error.message))
    }
  }
}
