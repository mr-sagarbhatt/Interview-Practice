import { createStore, combineReducers, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { thunk } from 'redux-thunk'
import { accountReducer } from '../reducers/account'
import { bonusReducer } from '../reducers/bonus'

export const bankStore = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger, thunk),
)
