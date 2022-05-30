import { configureStore } from '@reduxjs/toolkit'
import sequenceReducer from './src/Features/sequenceSlice'
import simonReducer from './src/Features/simonSlice'

export const store = configureStore({
  reducer: {
    userSequence: sequenceReducer,
    simonSequence: simonReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch