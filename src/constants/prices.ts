import { createSlice } from '@reduxjs/toolkit'

export const sizes = {
  kilnDry: {
    '19': [76, 102],
    '25': [76, 114],
    '38': [76, 114, 152],
    '50': [76],
    '76': [228]
  },
  wetOffSaw: {
    '76': [76, 114],
    '102': [102]
  }
}

export interface Prices {
  kilnDry: { [key: string]: Number }
  wetOffSaw: { [key: string]: Number }
  nails: Number
  labor: Number
}

export const initialPrices: Prices = {
  kilnDry: {
    '19x76': 0,
    '19x102': 0,
    '25x76': 0,
    '25x114': 0,
    '38x76': 0,
    '38x114': 0,
    '38x152': 0,
    '50x76': 0,
    '76x228': 0
  },
  wetOffSaw: {
    '76x76': 0,
    '76x102': 0,
    '102x102': 0
  },
  nails: 0,
  labor: 0
}

interface setPricesAction {
  payload: Prices
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
