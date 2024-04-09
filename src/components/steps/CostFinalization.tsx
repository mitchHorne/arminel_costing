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
  innerDimensionWidth: number,
  sideSlatThickness: string
): string => {
  const totalSideSlatThickness = Number(sideSlatThickness) * 2
  return String(innerDimensionWidth + totalSideSlatThickness)
}

const calculateBottomSlatQuantity = (
  inContainer: boolean,
  innerDimensionWidth: number,
  innerDimensionLength: number,
  bottomSlatWidth: string
): string => {
  if (inContainer)
    return String(Math.ceil(innerDimensionLength / Number(bottomSlatWidth)))
  return String(Math.ceil(innerDimensionWidth / Number(bottomSlatWidth)))
}

const calculateNails = (
  mainComponent: string,
  addedComponent: string,
  factor: number = 2
): string => {
  const components = Number(mainComponent) + Number(addedComponent)
  return String(components * factor)
}

const calculateSideSlatQuantity = (
  innerDimensionHeight: number,
  sideSlatWidth: string
): string =>
  String(Math.ceil(Number(innerDimensionHeight) / Number(sideSlatWidth)) * 2)

const calculateSideSlatLength = (
  innerDimensionsLength: number,
  sideSlatThickness: string,
  sideSlatWidth: string
): string => {
  const totalSideSlatThickness = Number(sideSlatThickness) * 2
  const totalEndCleatWidth = Number(sideSlatWidth) * 2
  return String(
    innerDimensionsLength + totalSideSlatThickness + totalEndCleatWidth
  )
}

const calculateSideCleatLength = (
  bearerWidth: string,
  bottomSlatThickness: string,
  innerDimensionHeight: number,
  sideSlatThickness: string,
  sideCleatThickness: string
): string =>
  String(
    Number(bearerWidth) +
      Number(bottomSlatThickness) +
      innerDimensionHeight +
      Number(sideSlatThickness) +
      Number(sideCleatThickness)
  )

const calculateEndCleatLengthHorizontal = (
  innerDimensionLength: number,
  sideSlatWidth: string
): string => {
  const totalSideSlatWidth = Number(sideSlatWidth) * 2
  return String(innerDimensionLength - totalSideSlatWidth)
}

const calculateLidSlatQuantity = (
  inContainer: boolean,
  innerDimensionsLength: number,
  innerDimensionsWidth: number,
  lidSlatWidth: string
): string => {
  if (inContainer)
    return String(Math.ceil(innerDimensionsLength / Number(lidSlatWidth)))
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

  const bearerLength = calculateBearerLength(
    innerDimensionsWidth,
    sideSlatThickness
  )

  const bottomNails = calculateNails(
    String(numberOfBearers),
    bottomSlatQuantity
  )

  const sideSlatQuantity = calculateSideSlatQuantity(
    innerDimensionsHeight,
    sideSlatWidth
  )
  const sideSlatLength = calculateSideSlatLength(
    innerDimensionsLength,
    sideSlatThickness,
    sideSlatWidth
  )

  const sideCleatThickness = sideSlatThickness
  const sideCleatWidth = sideSlatWidth // TO BE FIXED
  const sideCleatLength = calculateSideCleatLength(
    bearerWidth,
    bottomSlatThickness,
    innerDimensionsHeight,
    sideSlatThickness,
    sideCleatThickness
  )
  const sideCleatQuantity = String(Number(numberOfBearers) * 2)

  const sideNails = calculateNails(sideSlatQuantity, sideCleatQuantity)

  const endSlatWidth = sideSlatWidth
  const endSlatThickness = sideCleatThickness
  const endSlatQuantity = sideSlatQuantity
  const endSlatLength = String(innerDimensionsWidth)

  const endCleatWidth = sideCleatWidth
  const endCleatThickness = sideCleatThickness
  const endCleatLengthVertical = String(innerDimensionsHeight)
  const endCleatLengthHorizontal = calculateEndCleatLengthHorizontal(
    innerDimensionsLength,
    sideSlatWidth
  )
  const endCleatQuantity = '4'

  const endNails = calculateNails(sideSlatQuantity, endSlatQuantity, 3)

  const lidSlatWidth = sideSlatWidth
  const lidSlatThickness = sideSlatThickness
  const lidSlatLength = inContainer ? bearerLength : bearerLength // Replace with bottom slat length
  const lidSlatQuantity = calculateLidSlatQuantity(
    inContainer,
    innerDimensionsLength,
    innerDimensionsWidth,
    lidSlatWidth
  )

  const lidCleatWidth = sideCleatWidth
  const lidCleatThickness = sideCleatThickness
  const lidCleatLength = inContainer
    ? bearerWidth /* Replace with bottom slat length */
    : bearerLength
  const lidCleatQuantity = String(numberOfBearers)

  const lidNails = calculateNails(lidSlatQuantity, lidCleatQuantity)

  // Work out the cut-off lengths
  const bearerCostLength = calculateCostLength(bearerLength)
  const bottomSlatCostLength = calculateCostLength(bearerLength)
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
