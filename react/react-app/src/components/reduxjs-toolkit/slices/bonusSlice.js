import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  points: 0,
}

export const incrementByAmount = createAction('account/incrementByAmount')

export const bonusSlice = createSlice({
  name: 'bonus',
  initialState,
  reducers: {
    increment: (state) => {
      state.points += 1
    },
    decrement: (state) => {
      state.points -= 1
    },
    // TODO: It will create bonus/incrementByAmount action
    // incrementByAmount: (state, action) => {
    //   state.points += action.payload
    // },
  },
  // TODO: It will modify the reducers, ex: Add reducers which are not created in reducers by default and Add async functions to extra reducers.
  // TODO: It will create account/incrementByAmount action so that it will be executed always when the account/incrementByAmount action dispatched.
  // TODO: We can also use object in place of builder.
  extraReducers: (builder) => {
    builder.addCase(incrementByAmount, (state, action) => {
      if (action.payload >= 100) {
        state.points += 1
      }
    })
  },
})

export const { increment, decrement } = bonusSlice.actions

export default bonusSlice.reducer
