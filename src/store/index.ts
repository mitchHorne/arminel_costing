import { configureStore } from '@reduxjs/toolkit'
import priceReducer from '../constants/prices'

export default configureStore({
  reducer: {
    prices: priceReducer
  }
})
