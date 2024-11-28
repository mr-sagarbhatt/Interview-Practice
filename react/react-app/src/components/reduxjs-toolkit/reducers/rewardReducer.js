import { createAction, createReducer } from '@reduxjs/toolkit'

export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')
export const incrementByAmount = createAction('INCREMENT_BY_AMOUNT')

const initialState = {
  points: 0,
}

const rewardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.points++
    })
    .addCase(decrement, (state, action) => {
      state.points--
    })
    .addCase(incrementByAmount, (state, action) => {
      state.points += action.payload
    })
    // TODO: provide a default case if no other handlers matched
    .addDefaultCase((state, action) => state)
})

export default rewardReducer
