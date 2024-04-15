import { lengths } from '../../constants/sizes'
import { Prices } from '../../constants/prices'

const calculateSideSlatDimensions = (
  bottomSlatThickness: string
): [string, string] => {
  if (bottomSlatThickness === '50') return ['38', '114']
  if (bottomSlatThickness === '38') return ['25', '114']
  return ['19', '102']
}

const calculateBearerLength = (
  inContainer: boolean,
  innerDimensionWidth: number,
  innerDimensionLength: number,
  sideSlatThickness: string,
  endSlatThickness: string,
  endSlatWidth: string
): string => {
  if (inContainer && innerDimensionLength > 1100) {
    const totalEnds = Number(endSlatThickness) * 2 + Number(endSlatWidth) * 2
    return String(innerDimensionLength + totalEnds)
  }

  const totalSideSlatThickness = Number(sideSlatThickness) * 2
  return String(innerDimensionWidth + totalSideSlatThickness)
}

const calculateBottomSlatQuantity = (
  inContainer: boolean,
  innerDimensionWidth: number,
  innerDimensionLength: number,
  bottomSlatWidth: string
): string => {
  if (inContainer && innerDimensionLength > 1100)
    return String(Math.ceil(innerDimensionLength / Number(bottomSlatWidth)))
  return String(Math.ceil(innerDimensionWidth / Number(bottomSlatWidth)))
}

const calculateNails = (
  mainComponent: string,
  addedComponent: string,
  factor: number = 2
): string => {
  const components = Number(mainComponent) * Number(addedComponent)
  return String(components * factor)
}

const calculateSideSlatQuantity = (
  innerDimensionHeight: number,
  sideSlatWidth: string
): string =>
  String(Math.ceil(Number(innerDimensionHeight) / Number(sideSlatWidth)) * 2)

const calculateSideSlatLength = (
  innerDimensionsLength: number,
  endSlatThickness: string,
  endSlatWidth: string
): string => {
  const totalSideSlatThickness = Number(endSlatThickness) * 2
  const totalEndCleatWidth = Number(endSlatWidth) * 2
  return String(
    innerDimensionsLength + totalSideSlatThickness + totalEndCleatWidth
  )
}

const calculateSideCleatLength = (
  bearerWidth: string,
  bottomSlatThickness: string,
  innerDimensionHeight: number,
  lidSlatThickness: string,
  lidCleatThickness: string
): string =>
  String(
    Number(bearerWidth) +
      Number(bottomSlatThickness) +
      innerDimensionHeight +
      Number(lidSlatThickness) +
      Number(lidCleatThickness)
  )

const calculateEndCleatLengthHorizontal = (
  innerDimensionLength: number,
  endCleatWidth: string
): string => {
  const totalSideSlatWidth = Number(endCleatWidth) * 2
  return String(innerDimensionLength - totalSideSlatWidth)
}

const calculateLidSlatQuantity = (
  innerDimensionsWidth: number,
  lidSlatWidth: string
): string => {
  return String(Math.ceil(innerDimensionsWidth / Number(lidSlatWidth)))
}

const calculateCostLength = (length: string): string =>
  String(lengths.find(l => Number(length) <= l))

const calculateCubicMeters = (
  quantity: string,
  thickness: string,
  width: string,
  length: string
): number => {
  const cubicMmPerComponent =
    (Number(thickness) / 1000) *
    (Number(width) / 1000) *
    (Number(length) / 1000)
  const cubicMeterPerComponent = cubicMmPerComponent
  const totalCubicMeter = cubicMeterPerComponent * Number(quantity)
  return totalCubicMeter
}

const calculateCost = (
  size: string,
  cubicMeters: number,
  prices: Prices
): number => {
  const price = Number(prices.kilnDry[size])
  return cubicMeters * price
}

const calculateBottomSlatLength = (
  inContainer: boolean,
  innerDimensionLength: number,
  sideSlatThickness: string,
  endSlatThickness: string,
  endCleatThickness: string
): string => {
  if (inContainer && innerDimensionLength > 1100) {
    const totalSides = Number(sideSlatThickness) * 2
    return String(innerDimensionLength + totalSides)
  }
  const totalEnds = Number(endSlatThickness) * 2 + Number(endCleatThickness) * 2
  return String(innerDimensionLength + totalEnds)
}

interface PropsStructure {
  bearerSize: string
  bottomSlatSizes: string
  carryCapacity: number
  containerType: string
  costingType: string
  forExport: boolean
  forkliftOnly: boolean
  inContainer: boolean
  innerDimensionsHeight: number
  innerDimensionsLength: number
  innerDimensionsWidth: number
  numberOfBearers: number
  prices: Prices
  woodType: string
}

export default ({ props }: { props: PropsStructure }) => {
  const {
    bearerSize,
    bottomSlatSizes,
    inContainer,
    innerDimensionsHeight,
    innerDimensionsLength,
    innerDimensionsWidth,
    numberOfBearers,
    prices
  } = props

  if (!props) return null

  const bearerDimensions = bearerSize.split('x')
  const bearerThickness = bearerDimensions[0]
  const bearerWidth = bearerDimensions[1]

  const bottomSlatDimensions = bottomSlatSizes.split('x')
  const bottomSlatThickness = bottomSlatDimensions[0]
  const bottomSlatWidth = bottomSlatDimensions[1]

  const bottomSlatQuantity = calculateBottomSlatQuantity(
    inContainer,
    innerDimensionsWidth,
    innerDimensionsLength,
    bottomSlatWidth
  )

  const sideSlatDimensions = calculateSideSlatDimensions(bottomSlatThickness)
  const sideSlatThickness = sideSlatDimensions[0]
  const sideSlatWidth = sideSlatDimensions[1]

  const bottomNails = calculateNails(
    String(numberOfBearers),
    bottomSlatQuantity
  )

  const sideSlatQuantity = calculateSideSlatQuantity(
    innerDimensionsHeight,
    sideSlatWidth
  )

  const sideCleatThickness = sideSlatThickness
  const sideCleatWidth = '76'
  const sideCleatQuantity = String(Number(numberOfBearers) * 2)

  const sideNails = calculateNails(sideSlatQuantity, sideCleatQuantity)

  const endSlatWidth = sideSlatWidth
  const endSlatThickness = sideSlatThickness
  const endSlatQuantity = sideSlatQuantity
  const endSlatLength = String(innerDimensionsWidth)

  const endCleatWidth = sideCleatWidth
  const endCleatThickness = sideCleatThickness
  const endCleatLengthVertical = String(innerDimensionsHeight)
  const endCleatLengthHorizontal = calculateEndCleatLengthHorizontal(
    innerDimensionsLength,
    endCleatWidth
  )
  const endCleatQuantity = '4'

  const sideSlatLength = calculateSideSlatLength(
    innerDimensionsLength,
    endSlatThickness,
    endSlatWidth
  )

  const bearerLength = calculateBearerLength(
    inContainer,
    innerDimensionsWidth,
    innerDimensionsLength,
    sideSlatThickness,
    endSlatThickness,
    endCleatThickness
  )

  const bottomSlatLength = calculateBottomSlatLength(
    inContainer,
    innerDimensionsLength,
    sideSlatThickness,
    endSlatThickness,
    endSlatThickness
  )

  const endNails = calculateNails(sideSlatQuantity, endSlatQuantity, 3)

  const lidSlatWidth = sideSlatWidth
  const lidSlatThickness = sideSlatThickness
  const lidSlatLength = sideSlatLength
  const lidSlatQuantity = calculateLidSlatQuantity(
    innerDimensionsWidth,
    lidSlatWidth
  )

  const lidCleatWidth = sideCleatWidth
  const lidCleatThickness = sideCleatThickness
  const lidCleatLength = inContainer
    ? bottomSlatLength
    : String(innerDimensionsWidth + Number(sideSlatThickness) * 2)
  const lidCleatQuantity = String(Number(sideSlatQuantity) / 2)

  const sideCleatLength = calculateSideCleatLength(
    bearerWidth,
    bottomSlatThickness,
    innerDimensionsHeight,
    lidSlatThickness,
    lidCleatThickness
  )

  const lidNails = calculateNails(lidSlatQuantity, lidCleatQuantity)

  // Work out the cut-off lengths
  const bearerCostLength = calculateCostLength(bearerLength)
  const bottomSlatCostLength = calculateCostLength(bottomSlatLength)
  const sideSlatCostLength = calculateCostLength(sideSlatLength)
  const sideCleatCostLength = calculateCostLength(sideCleatLength)
  const endSlatCostLength = calculateCostLength(endSlatLength)
  const horizontalEndCleatCostLength = calculateCostLength(
    endCleatLengthHorizontal
  )
  const verticalEndCleatCostLength = calculateCostLength(endCleatLengthVertical)
  const lidSlatCostLength = calculateCostLength(lidSlatLength)
  const lidCleatCostLength = calculateCostLength(lidCleatLength)

  const bearerCubicMeters = calculateCubicMeters(
    String(numberOfBearers),
    bearerThickness,
    bearerWidth,
    bearerCostLength
  )
  const bottomSlatCubicMeters = calculateCubicMeters(
    bottomSlatQuantity,
    bottomSlatThickness,
    bottomSlatWidth,
    bottomSlatCostLength
  )
  const sideSlatCubicMeters = calculateCubicMeters(
    sideCleatQuantity,
    sideCleatThickness,
    sideCleatWidth,
    sideSlatCostLength
  )
  const sideCleatCubicMeters = calculateCubicMeters(
    sideCleatQuantity,
    sideCleatThickness,
    sideCleatWidth,
    sideCleatCostLength
  )
  const endSlatCubicMeters = calculateCubicMeters(
    endSlatQuantity,
    endSlatThickness,
    endSlatWidth,
    endSlatCostLength
  )
  const horizontalEndCleatCubicMeters = calculateCubicMeters(
    endCleatQuantity,
    endCleatThickness,
    endCleatWidth,
    horizontalEndCleatCostLength
  )
  const verticalEndCleatCubicMeters = calculateCubicMeters(
    endCleatQuantity,
    endCleatThickness,
    endCleatWidth,
    verticalEndCleatCostLength
  )
  const lidSlatCubicMeters = calculateCubicMeters(
    lidSlatQuantity,
    lidSlatThickness,
    lidSlatWidth,
    lidSlatCostLength
  )
  const lidCleatCubicMeters = calculateCubicMeters(
    lidCleatQuantity,
    lidCleatThickness,
    lidCleatWidth,
    lidCleatCostLength
  )
  const totalNails =
    Number(bottomNails) +
    Number(sideNails) +
    Number(endNails) +
    Number(lidNails)

  const bearerTotalCost = calculateCost(
    `${bearerThickness}x${bearerWidth}`,
    bearerCubicMeters,
    prices
  )
  const bottomSlatTotalCost = calculateCost(
    `${bearerThickness}x${bearerWidth}`,
    bottomSlatCubicMeters,
    prices
  )
  const sideSlatTotalCost = calculateCost(
    `${sideSlatThickness}x${sideSlatWidth}`,
    sideSlatCubicMeters,
    prices
  )
  const sideCleatTotalCost = calculateCost(
    `${sideCleatThickness}x${sideCleatWidth}`,
    sideCleatCubicMeters,
    prices
  )
  const endSlatTotalCost = calculateCost(
    `${endSlatThickness}x${endSlatWidth}`,
    endSlatCubicMeters,
    prices
  )
  const horizontalEndCleatTotalCost = calculateCost(
    `${endCleatThickness}x${endCleatWidth}`,
    horizontalEndCleatCubicMeters,
    prices
  )
  const verticalEndCleatTotalCost = calculateCost(
    `${endCleatThickness}x${endCleatWidth}`,
    verticalEndCleatCubicMeters,
    prices
  )
  const lidSlatTotalCost = calculateCost(
    `${lidSlatThickness}x${lidSlatWidth}`,
    lidSlatCubicMeters,
    prices
  )
  const lidCleatTotalCost = calculateCost(
    `${lidCleatThickness}x${lidCleatWidth}`,
    lidCleatCubicMeters,
    prices
  )

  const totalCubicMeters =
    bearerCubicMeters +
    bottomSlatCubicMeters +
    sideSlatCubicMeters +
    sideCleatCubicMeters +
    endSlatCubicMeters +
    horizontalEndCleatCubicMeters +
    verticalEndCleatCubicMeters +
    lidSlatCubicMeters +
    lidCleatCubicMeters

  const totalMaterialsCost =
    bearerTotalCost +
    bottomSlatTotalCost +
    sideSlatTotalCost +
    sideCleatTotalCost +
    endSlatTotalCost +
    horizontalEndCleatTotalCost +
    verticalEndCleatTotalCost +
    lidSlatTotalCost +
    lidCleatTotalCost

  const totalLaborCost = (
    Math.round(totalCubicMeters * Number(prices.labor) * 100) / 100
  ).toFixed(2)
  const totalNailsCost = (totalNails * Number(prices.nails)) / 100

  const totalCostPerItem = (
    Math.round(
      (totalMaterialsCost + Number(totalLaborCost) + totalNailsCost) * 100
    ) / 100
  ).toFixed(2)
  const totalCostPerItemPlusMargin = (
    Math.round(
      (Number(totalCostPerItem) + Number(totalCostPerItem) * 0.4) * 100
    ) / 100
  ).toFixed(2)
  const totalCost = Number(totalCostPerItemPlusMargin) * 100 // 100 boxes - Add quantity of boxes to calculate

  return (
    <div>
      <h1>Cost Finalization</h1>
      <p>Cost Finalization content</p>
      <h2>Costs</h2>
      <h3>Total cost per item</h3>
      <p>R {totalCostPerItem}</p>
      <h3>Total cost for labor</h3>
      <p>R {totalLaborCost}</p>
      <h3>Total cost for nails</h3>
      <p>R {totalNailsCost}</p>
      <h3>Total cost per item plus margin: 40%</h3>
      <p>R {totalCostPerItemPlusMargin}</p>
      <h3>Total cost for 100 boxes</h3>
      <p>R {totalCost}</p>
    </div>
  )
}
