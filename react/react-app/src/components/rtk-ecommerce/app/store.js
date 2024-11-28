import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../features/products/productSaga'

// TODO: Create the saga middleware and Mount it on the Store
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const eCommerceStore = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware)
  },
})

// TODO: Then run the saga
sagaMiddleware.run(rootSaga)
