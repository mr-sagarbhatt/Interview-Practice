import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  amount: 0,
}

export const getAccount = createAsyncThunk('account/getAccount', async (id, thunkAPI) => {
  const { data } = await axios.get(`http://localhost:3008/accounts/${id}`)
  return data.amount
})

export const counterSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    increment: (state) => {
      // TODO: Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
      state.amount += 1
    },
    decrement: (state) => {
      state.amount -= 1
    },
    incrementByAmount: (state, action) => {
      state.amount += action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccount.fulfilled, (state, action) => {
        state.amount = action.payload
        state.pending = false
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.error = action.error
        state.pending = false
      })
      .addCase(getAccount.pending, (state, action) => {
        state.pending = true
      })
  },
})

// TODO: RTK creates action types and action creators, we don't need to do it manually.
// ? Action creators are generated for each case reducer function
// ? Actions(Action Type) will be created as {sliceName}/{reducerKey} ex: account/increment
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
