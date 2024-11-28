import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../slices/accountSlice'
import bonusReducer from '../slices/bonusSlice'
import rewardReducer from '../reducers/rewardReducer'
import { adminApi } from '../api/adminSlice'

export const rtkBankStore = configureStore({
  reducer: {
    account: accountReducer,
    bonus: bonusReducer,
    reward: rewardReducer,
    // TODO: Add the generated reducer as a specific top-level slice
    [adminApi.reducerPath]: adminApi.reducer,
  },
  // TODO: Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminApi.middleware),
})
