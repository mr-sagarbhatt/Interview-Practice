import { ACCOUNT_ACTIONS } from '../actions/actions'

export const accountReducer = (state = { amount: 0 }, action) => {
  switch (action.type) {
    case ACCOUNT_ACTIONS.increment:
      return { amount: state.amount + 1 }
    case ACCOUNT_ACTIONS.decrement:
      return { amount: state.amount - 1 }
    case ACCOUNT_ACTIONS.incrementByAmount:
      return { amount: state.amount + action.payload }
    case ACCOUNT_ACTIONS.accountFulfilled:
      return { amount: action.payload, pending: false }
    case ACCOUNT_ACTIONS.accountRejected:
      return { ...state, error: action.error, pending: false }
    case ACCOUNT_ACTIONS.accountPending:
      return { ...state, pending: true }
    default:
      return state
  }
}
