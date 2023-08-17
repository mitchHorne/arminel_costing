import { createSlice } from '@reduxjs/toolkit'

export interface Prices {
  kilmDry: {
    '19x76': Number
    '19x114': Number
    '25x76': Number
    '25x114': Number
    '38x114': Number
    '50x76': Number
    '76x102': Number
    '76x228': Number
  }
  wetOffSaw: {
    '19x76': Number
    '19x114': Number
    '25x76': Number
    '25x114': Number
    '38x114': Number
    '50x76': Number
    '76x102': Number
    '76x228': Number
  }
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
  }
}

interface setInitialPricesAction {
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
    setInitialPrices: (state: Prices, action: setInitialPricesAction) => {
      state = action.payload
    },
    updatePrice: (state: Prices, action: priceUpdateAction) => {
      const { type, size, price } = action.payload
      state[type][size] = price
    }
  }
})

// Action creators are generated for each case reducer function
export const { setInitialPrices, updatePrice } = pricesSlice.actions

export default pricesSlice.reducer
