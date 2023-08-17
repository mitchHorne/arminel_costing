import { createSlice } from '@reduxjs/toolkit'

export interface Prices {
  kilmDry: { [key: string]: Number }
  wetOffSaw: { [key: string]: Number }
  nails: Number
  labor: Number
}

export const initialPrices: Prices = {
  kilmDry: {
    '19x76': 0,
    '19x114': 0,
    '25x76': 0,
    '25x114': 0,
    '38x114': 0,
    '50x76': 0,
    '76x102': 0,
    '76x228': 0
  },
  wetOffSaw: {
    '19x76': 0,
    '19x114': 0,
    '25x76': 0,
    '25x114': 0,
    '38x114': 0,
    '50x76': 0,
    '76x102': 0,
    '76x228': 0
  },
  nails: 0,
  labor: 0
}

interface setPricesAction {
  payload: Prices
}

interface priceUpdateAction {
  payload: {
    type: 'kilmDry' | 'wetOffSaw'
    size:
      | '19x76'
      | '19x114'
      | '25x76'
      | '25x114'
      | '38x114'
      | '50x76'
      | '76x102'
      | '76x228'
    price: Number
  }
}

export const pricesSlice = createSlice({
  name: 'prices',
  initialState: initialPrices,
  reducers: {
    setPrices: (state: Prices, action: setPricesAction) =>
      (state = action.payload)
  }
})

// Action creators are generated for each case reducer function
export const { setPrices } = pricesSlice.actions

export default pricesSlice.reducer
