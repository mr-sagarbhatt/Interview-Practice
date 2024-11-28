// TODO: Use following command to run db.json file as a json server: `npx json-server db.json -p 3008`, to check async operation through redux-thunk

import axios from 'axios'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger' // TODO: A third party middleware which listen for changes in the Redux store’s state and log the action type, previous and new state
import { thunk } from 'redux-thunk'

// TODO: Redux follow 3 principles
// TODO: 1. Single source of truth - global store
// TODO: 2. State is read-only - Immutable updates, no direct mutation of previous states
// TODO: 3. Pure functions: State is updated by pure functions - no side effects

// TODO: Action Name Constants: Defining constant for all the actions types so that type doesn't mismatched
const ACTION_TYPES = {
  increment: 'increment',
  decrement: 'decrement',
  incrementByAmount: 'incrementByAmount',
}

// TODO: Create store: createStore() is used to create a store which takes a reducer function but it's deprecated now we are using configureStore()
// ? principle 1. Single source of truth - global store

// TODO: Middlewares:
// TODO: In Redux, applyMiddleware is a function used to enhance the Redux store with middleware. Middleware in Redux allows you to intercept and modify the dispatch process, or add additional functionality, such as logging, handling asynchronous actions (e.g., with Redux Thunk or Redux Saga), or processing side effects.
const store = createStore(reducer, applyMiddleware(logger.default)) // ! Need to pass logger.default in node only, without default it gives an error

const history = []

// TODO: reducer: Reducer is a function which takes 2 arguments in a sequence state and action, and this function always return a state (new state)
// TODO: reducer arguments:
// TODO: 1. state: It is the previous state of the application previous and we can also pass initial value to it
// TODO: 2. action: it is a convention for an object which contains type, payload, etc...
// ? principle 3. Pure functions: State is updated by pure functions - no side effects
function reducer(state = { amount: 1 }, action) {
  if (action.type === ACTION_TYPES?.increment) {
    // ! mutate the state: We should not change the state directly because if you directly update the previous state then you doesn't have the reference(history) of the previous state so you can not perform some actions through it.
    // state.amount = state.amount + 1
    // TODO: immutability: We should return a new state over mutating a previous state
    // ? principle 2. State is read-only - Immutable updates, no direct mutation of previous states
    return { amount: state.amount + 1 }
  }
  if (action.type === 'decrement') {
    return { amount: state.amount - 1 }
  }
  if (action.type === 'incrementByAmount') {
    return { amount: state.amount + action.payload }
  }
  return state
}

// TODO: Get global state: store.getState() is used to get the current state of the global store
console.log(`From console.log`, store.getState())

// TODO: store.subscribe(listener): The store.subscribe(listener) method is used to listen for changes in the Redux store’s state. Whenever the state changes, the provided listener function will be called. This method returns an unsubscribe function, which can be used to stop listening for state updates.
const unsubscribe = store.subscribe(() => {
  history.push(store.getState())
  console.log(`From store.subscribe`, store.getState(), history)
})

// TODO: store.dispatch(action): store.dispatch(action) is used to dispatch an action to the store, When an action is dispatched, Redux’s reducer function will handle it and return a new state
store.dispatch({ type: 'increment' })
store.dispatch({ type: 'increment' })

// setInterval(() => {
//   store.dispatch({ type: 'increment' })
// }, 2000)

store.dispatch({ type: 'decrement' })
store.dispatch({ type: 'incrementByAmount', payload: 2 })

// TODO: Action creators: Instead of directly adding action to dispatch we create a function and returning an action so that it can be ued at multiple places.
const increment = () => {
  return { type: ACTION_TYPES?.increment }
}
const decrement = () => {
  return { type: 'decrement' }
}
const incrementByAmount = (payload) => {
  return { type: 'incrementByAmount', payload }
}
store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(incrementByAmount(4))
console.log(`From console.log`, store.getState())

unsubscribe() // ! No output because we've unsubscribed
store.dispatch(increment())
console.log(`From console.log`, store.getState())

// TODO: Example of Redux Thunk for async API call

// TODO: Async API call
// const getUser = async () => {
//   const { data } = await axios.get('http://localhost:3008/accounts/1')
//   console.log({ data })
// }
// getUser()

// * ACTION TYPES CONSTANT
const USER_ACTIONS = {
  init: 'INIT',
}

// * USER ACTION CREATORS
// TODO: either create one creator for both get and init user or you can crate 2 creators separately for get user and init user
// ? 1. one creator for both get and init user
const getAndInitUser = async (dispatch, getState) => {
  // TODO: Here we can not perform data fetching because we need to create this function as asynchronous and then it will always return a promise but we need to return an object.
  // TODO: So we use Redux Thunk to handle this situation.
  const { data } = await axios.get('http://localhost:3008/accounts/1')
  dispatch({ type: USER_ACTIONS?.init, payload: data?.amount })
}
// ? 2. Separate creator for both get and init user
const initUser = (payload) => {
  return { type: USER_ACTIONS?.init, payload }
}

const getUser = async (dispatch, getState) => {
  const { data } = await axios.get('http://localhost:3008/accounts/1')
  dispatch(initUser(data?.amount))
}

// TODO: Dynamic action creators fro user: Creating a nested function where outer function will get an ID and return an async function performing async operations
const getUserDynamically = (id) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3008/accounts/${id}`)
    dispatch(initUser(data?.amount))
  }
}

// * USER REDUCER
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIONS.init:
      return { amount: action.payload }
    default:
      return state
  }
}
// * USER STORE
const userStore = createStore(userReducer, applyMiddleware(logger.default, thunk))

// TODO: Now as we are using thunk middleware we are passing a function definition as an argument instead of directly calling a function. SO now it will dispatch action 2 times, 1st for the async dispatch and 2nd for the state update action
// ? 1. one creator for both get and init user
// userStore.dispatch(getAndInitUser)
// ? 2. Separate creator for both get and init user
// userStore.dispatch(getUser)
// TODO: Dynamic action creators fro user: Creating a nested function where outer function will get an ID and return an async function performing async operations
userStore.dispatch(getUserDynamically(2))

// TODO: Example of Multiple reducers

const ACCOUNT_ACTIONS = {
  increment: 'INCREMENT',
  incrementByAmount: 'INCREMENT_BY_AMOUNT',
  accountFulfilled: 'ACCOUNT_FULFILLED',
  accountRejected: 'ACCOUNT_REJECTED',
  accountPending: 'ACCOUNT_PENDING',
}
const BONUS_ACTIONS = {
  increment: 'INCREMENT',
  incrementByAmount: 'INCREMENT_BY_AMOUNT',
}

const accountIncrement = () => {
  return { type: ACCOUNT_ACTIONS?.increment }
}
const accountIncrementByAmount = (payload) => {
  return { type: ACCOUNT_ACTIONS.incrementByAmount, payload }
}
const accountFulfilled = (payload) => {
  return { type: ACCOUNT_ACTIONS.accountFulfilled, payload }
}
const accountRejected = (error) => {
  return { type: ACCOUNT_ACTIONS.accountRejected, error }
}
const accountPending = () => {
  return { type: ACCOUNT_ACTIONS.accountPending }
}
const getAccount = (id) => {
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

const accountReducer = (state = { amount: 0 }, action) => {
  switch (action.type) {
    case ACCOUNT_ACTIONS.increment:
      return { amount: state.amount + 1 }
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

const bonusReducer = (state = { points: 0 }, action) => {
  switch (action.type) {
    case BONUS_ACTIONS.increment:
      return { points: state.points + 1 }
    case BONUS_ACTIONS.incrementByAmount:
      if (action.payload >= 100) return { points: state.points + 1 }
    default:
      return state
  }
}

const bankStore = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk),
)

bankStore.dispatch(accountIncrement()) // ! It will increment both account amount and bonus points as both has same action type called increment
bankStore.dispatch(accountIncrementByAmount(99)) // ! It will increment both account amount and bonus points as both has same action type called increment
bankStore.dispatch(accountIncrementByAmount(100)) // ! It will increment both account amount and bonus points as both has same action type called increment
bankStore.dispatch(getAccount(2))

// TODO: Summary
// TODO: 1) Store has: state, reducer and dispatch
// ? State - nested object depending on the no of reducers,
// ? Reducer - A function contains previous state and an action, and returns a new state
// ? dispatch - A function used to dispatch an action to the store and update the state in which we are passing action type and payload
// TODO: 2) action: An object with some properties like type, payload, error, pending etc...
