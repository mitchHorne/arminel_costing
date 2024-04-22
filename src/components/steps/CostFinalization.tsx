import { useState } from 'react'
import { lengths } from '../../constants/sizes'
import { Prices } from '../../constants/prices'
import {
  Arrow,
  InputContainer,
  InputRow,
  StatsContainer,
  StatsContentContainer,
  StatsRowHeader,
  StyledInput
} from './InputFormComponents'
import { Button } from '../Button'

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
  endCleatThickness: string
): string => {
  const totalEndSlatThickness = Number(endSlatThickness) * 2
  const totalEndCleatThickness = Number(endCleatThickness) * 2
  return String(
    innerDimensionsLength + totalEndSlatThickness + totalEndCleatThickness
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
    (Number(thickness) * Number(width) * Number(length)) / 1000000000
  const cubicMeterPerComponent = cubicMmPerComponent
  const totalCubicMeter = cubicMeterPerComponent * Number(quantity)
  return totalCubicMeter
}

const calculateCost = (
  size: string,
  cubicMeters: number,
  prices: Prices,
  woodType?: 'kilnDry' | 'wetOffSaw'
): number => {
  let type: 'kilnDry' | 'wetOffSaw' = 'kilnDry'
  if (woodType) type = woodType
  const price = Number(prices[type][size])
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
  bearerWoodType: 'kilnDry' | 'wetOffSaw'
}

export default ({ props }: { props: PropsStructure }) => {
  const {
    bearerSize,
    bottomSlatSizes,
    forkliftOnly,
    forExport,
    inContainer,
    innerDimensionsHeight,
    innerDimensionsLength,
    innerDimensionsWidth,
    numberOfBearers,
    prices,
    bearerWoodType
  } = props

  if (!props) return null

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [profitMargin, setProfitMargin] = useState<string>('40')
  const [numberToMake, setNumberToMake] = useState<string>('100')

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

  const sideSlatLength = bottomSlatLength

  const endNails = calculateNails('4', endSlatQuantity, 3)

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
  const lidCleatQuantity = numberOfBearers

  const sideCleatLength = calculateSideCleatLength(
    bearerWidth,
    bottomSlatThickness,
    innerDimensionsHeight,
    lidSlatThickness,
    lidCleatThickness
  )

  const lidNails = calculateNails(lidSlatQuantity, String(lidCleatQuantity))

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
    sideSlatQuantity,
    sideSlatThickness,
    sideSlatWidth,
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
    String(lidCleatQuantity),
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
    prices,
    bearerWoodType
  )
  const bottomSlatTotalCost = calculateCost(
    `${bottomSlatThickness}x${bottomSlatWidth}`,
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

  const totalMaterialsCost: Number =
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
    Math.round(
      totalCubicMeters * Number(prices.labor) * Number(numberToMake) * 100
    ) / 100
  ).toFixed(2)

  const totalLaborCostPerItem = (
    Math.round((Number(totalLaborCost) / Number(numberToMake)) * 100) / 100
  ).toFixed(2)

  const totalNailsCost = (
    Math.round(((totalNails * Number(prices.nails)) / 100) * 100) / 100
  ).toFixed(2)

  const totalCostPerItem = (
    Math.round(
      (Number(totalMaterialsCost) +
        Number(totalLaborCost) / Number(numberToMake) +
        Number(totalNailsCost)) *
        100
    ) / 100
  ).toFixed(2)

  const margin = Number(profitMargin) / 100
  const totalCostPerItemPlusMargin = (
    Math.round(
      (Number(totalCostPerItem) + Number(totalCostPerItem) * margin) * 100
    ) / 100
  ).toFixed(2)

  const totalCost = (
    Math.round(
      Number(totalCostPerItemPlusMargin) * Number(numberToMake) * 100
    ) / 100
  ).toFixed(2)

  const profit = (
    Math.round(Number(totalCostPerItem) * margin * 100) / 100
  ).toFixed(2)

  const [itemCostInfo, setItemCostInfo] = useState<boolean>(false)
  const [totalCostInfo, setTotalCostInfo] = useState<boolean>(false)
  const [baseInfo, setBaseInfo] = useState<boolean>(false)
  const [bottomInfo, setBottomInfo] = useState<boolean>(false)
  const [sideInfo, setSideInfo] = useState<boolean>(false)
  const [endInfo, setEndInfo] = useState<boolean>(false)
  const [lidInfo, setLidInfo] = useState<boolean>(false)
  const [cubicInfo, setCubicInfo] = useState<boolean>(false)
  const [costsInfo, setCostsInfo] = useState<boolean>(false)

  const closeContainer = (func: Function) => func(false)

  const openInfoContainer = (func: Function) => {
    if (itemCostInfo) setItemCostInfo(false)
    if (totalCostInfo) setTotalCostInfo(false)
    if (baseInfo) setBaseInfo(false)
    if (bottomInfo) setBottomInfo(false)
    if (sideInfo) setSideInfo(false)
    if (endInfo) setEndInfo(false)
    if (lidInfo) setLidInfo(false)
    if (cubicInfo) setCubicInfo(false)
    if (costsInfo) setCostsInfo(false)

    func(true)
  }

  return (
    <div>
      <h1>Cost Finalization</h1>

      {!showDetails && (
        <>
          <InputContainer>
            <InputRow>
              <h4>Profit Margin %</h4>
              <StyledInput
                onChange={(e: { target: { value: string } }) =>
                  setProfitMargin(e.target.value)
                }
                onClick={e => {
                  const target = e.target as HTMLInputElement
                  target.select()
                }}
                type='number'
                value={profitMargin}
              />
            </InputRow>
            <InputRow>
              <h4>Number of crates to make</h4>
              <StyledInput
                onChange={(e: { target: { value: string } }) =>
                  setNumberToMake(e.target.value)
                }
                onClick={e => {
                  const target = e.target as HTMLInputElement
                  target.select()
                }}
                type='number'
                value={numberToMake}
              />
            </InputRow>
          </InputContainer>
          <StatsContainer>
            <StatsRowHeader
              onClick={() => {
                if (itemCostInfo) closeContainer(setItemCostInfo)
                else openInfoContainer(setItemCostInfo)
              }}
            >
              <h4>
                <Arrow open={itemCostInfo} /> Item Cost
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={250} open={itemCostInfo}>
              <h4>Total cost per item</h4>
              <p>R {totalCostPerItem}</p>
              <h4>Material cost per item</h4>
              <p>R {totalMaterialsCost.toFixed(2)}</p>
              <h4>Labor cost per item</h4>
              <p>R {totalLaborCostPerItem}</p>
              <h4>Nails cost per item</h4>
              <p>R {totalNailsCost}</p>
              <h4>Total cost per item plus margin: {profitMargin}%</h4>
              <p>R {totalCostPerItemPlusMargin}</p>
              <h4>Total Profit per item: {profitMargin}%</h4>
              <p>R {profit}</p>
            </StatsContentContainer>
            <StatsRowHeader
              onClick={() => {
                if (totalCostInfo) closeContainer(setTotalCostInfo)
                else openInfoContainer(setTotalCostInfo)
              }}
            >
              <h4>
                <Arrow open={totalCostInfo} /> Total Costs
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={100} open={totalCostInfo}>
              <h4>Total cost for Labor</h4>
              <p>R {totalLaborCost}</p>
              <h4>Total cost for {numberToMake} boxes</h4>
              <p>R {totalCost}</p>
            </StatsContentContainer>
          </StatsContainer>
          <InputContainer>
            <Button onClick={() => setShowDetails(true)}>Show Details</Button>
          </InputContainer>
        </>
      )}

      {showDetails && (
        <>
          <StatsContainer>
            <StatsRowHeader
              onClick={() => {
                if (baseInfo) closeContainer(setBaseInfo)
                else openInfoContainer(setBaseInfo)
              }}
            >
              <h4>
                <Arrow open={baseInfo} /> General Information
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={200} open={baseInfo}>
              <h4>For Export</h4>
              <p>{forExport ? 'True' : 'False'}</p>
              <h4>Shipped in a container?</h4>
              <p>{inContainer ? 'Yes' : 'No'}</p>
              <h4>Forklifts only or forklift and trolley</h4>
              <p>{forkliftOnly ? 'Forklift' : 'Forklift and Trolley'}</p>
              <h4>Inner Dimensions Length x Width x Height (mm)</h4>
              <p>
                {innerDimensionsLength} X {innerDimensionsWidth} X{'   '}
                {innerDimensionsHeight}
              </p>
              <h4>Wood type for the Crate</h4>
              <p>Kiln Dry</p>
            </StatsContentContainer>
            <StatsRowHeader
              onClick={() => {
                if (bottomInfo) closeContainer(setBottomInfo)
                else openInfoContainer(setBottomInfo)
              }}
            >
              <h4>
                <Arrow open={bottomInfo} /> Crate Bottom Information
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={300} open={bottomInfo}>
              <h4>Wood for Bearers</h4>
              <p>{bearerWoodType === 'kilnDry' ? 'Kiln Dry' : 'Wet Offsaw'}</p>
              <h4>Number of Bearers</h4>
              <p>{numberOfBearers}</p>
              <h4>Bearer Size (mm)</h4>
              <p>{bearerSize}</p>
              <h4>Length of Bearers (mm)</h4>
              <p>{bearerLength}</p>
              <h4>Bottom Slat Size (mm)</h4>
              <p>
                {bottomSlatThickness}X{bottomSlatWidth}
              </p>
              <h4>Bottom Slat Length (mm)</h4>
              <p>{bottomSlatLength}</p>
              <h4>Number of Bottom Slats</h4>
              <p>{bottomSlatQuantity}</p>
              <h4>Number of Bottom Nails</h4>
              <p>{bottomNails}</p>
            </StatsContentContainer>
            <StatsRowHeader
              onClick={() => {
                if (sideInfo) closeContainer(setSideInfo)
                else openInfoContainer(setSideInfo)
              }}
            >
              <h4>
                <Arrow open={sideInfo} /> Crate Side Information
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={280} open={sideInfo}>
              <h4>Side Slat Size (mm)</h4>
              <p>
                {sideSlatThickness}x{sideSlatWidth}
              </p>
              <h4>Side Slat Length (mm)</h4>
              <p>{sideSlatLength}</p>
              <h4>Number of Side slats</h4>
              <p>{sideSlatQuantity}</p>
              <h4>Side Cleat Size (mm)</h4>
              <p>
                {sideCleatThickness}x{sideCleatWidth}
              </p>
              <h4>Side Cleat Length (mm)</h4>
              <p>{sideCleatLength}</p>
              <h4>Number of Side Cleats</h4>
              <p>{sideCleatQuantity}</p>
              <h4>Number of Side Nails</h4>
              <p>{sideNails}</p>
            </StatsContentContainer>
            <StatsRowHeader
              onClick={() => {
                if (endInfo) closeContainer(setEndInfo)
                else openInfoContainer(setEndInfo)
              }}
            >
              <h4>
                <Arrow open={endInfo} /> Crate Ends Information
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={300} open={endInfo}>
              <h4>End Slat Size (mm)</h4>
              <p>
                {endSlatThickness}x{endSlatWidth}
              </p>
              <h4>End Slat Length (mm)</h4>
              <p>{endSlatLength}</p>
              <h4>Number of End Slats</h4>
              <p>{endSlatQuantity}</p>
              <h4>End Cleat Size (mm)</h4>
              <p>
                {endCleatThickness}x{endCleatWidth}
              </p>
              <h4>End Cleat Horizontal Length (mm)</h4>
              <p>{endCleatLengthHorizontal}</p>
              <h4>End Cleat Vertical Length (mm)</h4>
              <p>{endCleatLengthVertical}</p>
              <h4>Number of End Cleats</h4>
              <p>{Number(endCleatQuantity) * 2}</p>
              <h4>Number of End Nails</h4>
              <p>{endNails}</p>
            </StatsContentContainer>
            <StatsRowHeader
              onClick={() => {
                if (lidInfo) closeContainer(setLidInfo)
                else openInfoContainer(setLidInfo)
              }}
            >
              <h4>
                <Arrow open={lidInfo} /> Crate Lid Information
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={300} open={lidInfo}>
              <h4>Lid Slat Size (mm)</h4>
              <p>
                {lidSlatThickness}x{lidSlatWidth}
              </p>
              <h4>Lid Slat Length (mm)</h4>
              <p>{lidSlatLength}</p>
              <h4>Number of Lid Slats</h4>
              <p>{lidSlatQuantity}</p>
              <h4>Lid Cleat Size (mm)</h4>
              <p>
                {lidCleatThickness}x{lidCleatWidth}
              </p>
              <h4>Lid Cleat Length (mm)</h4>
              <p>{lidCleatLength}</p>
              <h4>Number of lid Cleats</h4>
              <p>{lidCleatQuantity}</p>
              <h4>Number of Lid Nails</h4>
              <p>{lidNails}</p>
            </StatsContentContainer>
            <StatsRowHeader
              onClick={() => {
                if (cubicInfo) closeContainer(setCubicInfo)
                else openInfoContainer(setCubicInfo)
              }}
            >
              <h4>
                <Arrow open={cubicInfo} /> Cubic Meter Breakdowns
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={400} open={cubicInfo}>
              <h4>Total cubic meters</h4>
              <p>{totalCubicMeters.toFixed(7)} m³</p>
              <h4>Bearer cubic meters</h4>
              <p>{bearerCubicMeters.toFixed(7)} m³</p>
              <h4>Bottom slat cubic meters</h4>
              <p>{bottomSlatCubicMeters.toFixed(7)} m³</p>
              <h4>Sie slat cubic meters</h4>
              <p>{sideSlatCubicMeters.toFixed(7)} m³</p>
              <h4>Side cleat cubic meters</h4>
              <p>{sideCleatCubicMeters.toFixed(7)} m³</p>
              <h4>End slat cubic meters</h4>
              <p>{endSlatCubicMeters.toFixed(7)} m³</p>
              <h4>Horizontal end cleat cubic meters</h4>
              <p>{horizontalEndCleatCubicMeters.toFixed(7)} m³</p>
              <h4>Vertical end cleat cubic meters</h4>
              <p>{verticalEndCleatCubicMeters.toFixed(7)} m³</p>
              <h4>Lid slat cubic meters</h4>
              <p>{lidSlatCubicMeters.toFixed(7)} m³</p>
              <h4>Lid Cleat Cubic meters</h4>
              <p>{lidCleatCubicMeters.toFixed(7)} m³</p>
            </StatsContentContainer>
            <StatsRowHeader
              onClick={() => {
                if (costsInfo) closeContainer(setCostsInfo)
                else openInfoContainer(setCostsInfo)
              }}
            >
              <h4>
                <Arrow open={costsInfo} /> Cost Breakdowns
              </h4>
            </StatsRowHeader>
            <StatsContentContainer height={400} open={costsInfo}>
              <h4>Labor cost per cubic meter</h4>
              <p>R {String(prices.labor)}</p>
              <h4>Total material cost</h4>
              <p>R {totalMaterialsCost.toFixed(2)}</p>
              <h4>Total Bearer cost</h4>
              <p>R {bearerTotalCost.toFixed(2)}</p>
              <h4>Total bottom slat cost</h4>
              <p>R {bottomSlatTotalCost.toFixed(2)}</p>
              <h4>Total side slat cost</h4>
              <p>R {sideSlatTotalCost.toFixed(2)}</p>
              <h4>Total Side cleat cost</h4>
              <p>R {sideCleatTotalCost.toFixed(2)}</p>
              <h4>Total end slat cost</h4>
              <p>R {endSlatTotalCost.toFixed(2)}</p>
              <h4>Total horizontal end cleat cost</h4>
              <p>R {horizontalEndCleatTotalCost.toFixed(2)}</p>
              <h4>Total End cleat cost</h4>
              <p>R {verticalEndCleatTotalCost.toFixed(2)}</p>
              <h4>Total Lid Slat cost</h4>
              <p>R {lidSlatTotalCost.toFixed(2)}</p>
              <h4>Total Lid cleat cost</h4>
              <p>R {lidCleatTotalCost.toFixed(2)}</p>
            </StatsContentContainer>
          </StatsContainer>
          <InputContainer>
            <Button onClick={() => setShowDetails(false)}>Show Details</Button>
          </InputContainer>
        </>
      )}
    </div>
  )
}
