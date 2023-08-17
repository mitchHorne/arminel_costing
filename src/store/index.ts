import { configureStore } from '@reduxjs/toolkit'
import priceReducer from './prices'

export default configureStore({
  reducer: {
    prices: priceReducer
  }
})
