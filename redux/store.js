import { configureStore } from '@reduxjs/toolkit'
import TodoReducer from '../redux/features/taskSlice'

export const store = configureStore({
    reducer: {
      todos:TodoReducer
    },
  })