import { BONUS_ACTIONS } from '../actions/actions'

export const bonusReducer = (state = { points: 0 }, action) => {
  switch (action.type) {
    case BONUS_ACTIONS.increment:
      return { points: state.points + 1 }
    case BONUS_ACTIONS.decrement:
      return { points: state.points - 1 }
    case BONUS_ACTIONS.incrementByAmount:
      if (action.payload >= 100) return { points: state.points + 1 }
    default:
      return state
  }
}
