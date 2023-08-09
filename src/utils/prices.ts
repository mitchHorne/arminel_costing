interface Sizes {
  '9x76': Number
  '19x114': Number
  '25x76': Number
  '25x114': Number
  '38x114': Number
  '50x76': Number
  '76x102': Number
  '76x228': Number
}

export interface Prices {
  kilmDry: Sizes
  wetOffSaw: Sizes
}

const sizes: Sizes = {
  '9x76': 0,
  '19x114': 0,
  '25x76': 0,
  '25x114': 0,
  '38x114': 0,
  '50x76': 0,
  '76x102': 0,
  '76x228': 0
}

export const basePrices: Prices = {
  kilmDry: { ...sizes },
  wetOffSaw: { ...sizes }
}
