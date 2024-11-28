import { call, put, take, takeEvery, takeLatest, all } from 'redux-saga/effects' // TODO: These are the side effects
import {
  sagaFetchApiPending,
  sagaFetchApiFulfilled,
  sagaFetchApiRejected,
  sagaAddApiPending,
  sagaAddApiFulfilled,
  sagaAddApiRejected,
} from './productSlice'
import { fetchProducts, addProduct } from './productApi'

// TODO: Worker saga will be fired on sagaFetchApiPending actions
// * get
function* fetchProductsCreator(action) {
  try {
    // TODO: call is used to call an API function.
    const response = yield call(fetchProducts)
    // TODO: put is used to dispatch an action.
    yield put({ type: sagaFetchApiFulfilled.toString(), payload: response.data })
  } catch (e) {
    yield put({ type: sagaFetchApiRejected.toString(), error: e.message })
  }
}

// TODO: Starts fetchProductsCreator on each dispatched sagaFetchApiPending action
// TODO: Allows concurrent fetches of user
export function* watchGetItemsSaga() {
  // TODO: We use takeEvery, a helper function provided by redux-saga, to listen for dispatched sagaFetchApiPending actions and run fetchProductsCreator each time
  // TODO: sagaFetchApiPending is rtk action which we have to convert to string and we are passing it to a fetchProductsCreator function
  // TODO: Allows concurrent fetches of products.
  yield takeEvery(sagaFetchApiPending.toString(), fetchProductsCreator)
  // TODO: Alternatively you may use takeLatest.
  // TODO:  Does not allow concurrent fetches of products. If "sagaFetchApiPending" gets dispatched while a fetch is already pending, that pending fetch is cancelled and only the latest one will be run.
  //   yield takeLatest(sagaFetchApiPending.toString(), fetchProductsCreator)
}

// * add
function* addProductCreator(action) {
  try {
    const response = yield call(addProduct, action.payload)
    yield put({ type: sagaAddApiFulfilled.toString(), payload: response.data })
  } catch (e) {
    yield put({ type: sagaAddApiRejected.toString(), error: e.message })
  }
}
export function* watchAddItemsSaga() {
  yield takeEvery(sagaAddApiPending.toString(), addProductCreator)
}

// TODO: notice how we now only export the rootSaga, single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchGetItemsSaga(), watchAddItemsSaga()])
}
