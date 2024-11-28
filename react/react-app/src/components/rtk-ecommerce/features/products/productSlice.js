import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts, addProduct, deleteProduct, updateProduct } from './productApi'

const initialState = {
  products: [],
  status: 'idle',
}

// * Saga APIs
// * get
export const sagaFetchApiPending = createAction('products/sagaFetchProducts/pending')
export const sagaFetchApiFulfilled = createAction('products/sagaFetchProducts/fulfilled')
export const sagaFetchApiRejected = createAction('products/sagaFetchProducts/rejected')

// * add
export const sagaAddApiPending = createAction('products/sagaAddProducts/pending')
export const sagaAddApiFulfilled = createAction('products/sagaAddProducts/fulfilled')
export const sagaAddApiRejected = createAction('products/sagaAddProducts/rejected')

// * Thunk APIs
// * get
export const fetchAsync = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetchProducts()
  return response.data
})

// * add
export const addAsync = createAsyncThunk('products/addProduct', async (item) => {
  const response = await addProduct(item)
  return response.data
})

// * update
export const updateAsync = createAsyncThunk('products/updateProducts', async ({ id, changes }) => {
  const response = await updateProduct({ id, changes })
  console.log({ response })
  return response.data // action.payload
})

// * delete
export const deleteAsync = createAsyncThunk('products/deleteProducts', async (id) => {
  const response = await deleteProduct(id)
  return response.data.id
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    test: (state, action) => {
      console.log('test state and action', { state, action })
    },
  },
  extraReducers: (builder) => {
    builder
      // * Thunk APIs
      // * get
      .addCase(fetchAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
      // * add
      .addCase(addAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products.push(action.payload)
      })
      // * update
      .addCase(updateAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updateAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        const index = state.products.findIndex((product) => product.id === action.payload.id)
        console.log(action.payload, 1)
        state.products.splice(index, 1, action.payload)
      })
      // * delete
      .addCase(deleteAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(deleteAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        const index = state.products.findIndex((product) => product.id === action.payload)
        state.products.splice(index, 1)
      })
      // * Saga APIs
      // * get
      .addCase(sagaFetchApiPending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(sagaFetchApiRejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })
      .addCase(sagaFetchApiFulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
      // * add
      .addCase(sagaAddApiPending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(sagaAddApiRejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })
      .addCase(sagaAddApiFulfilled, (state, action) => {
        state.status = 'idle'
        state.products.push(action.payload)
      })
  },
})

export const { test } = productsSlice.actions

export default productsSlice.reducer
