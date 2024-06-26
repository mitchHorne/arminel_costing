import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import { saveData } from '../utils/files'
import { setPrices } from '../constants/prices'
import { S } from '@tauri-apps/api/cli-373e13ed'

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  div {
    h2 {
      margin: 0;
      padding-bottom: 0.5rem;
    }

    p {
      display: flex;
      justify-content: space-between;
      margin: 0;
    }
  }
`

const PriceCategory = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  div {
    align-items: flex-start;
    display: flex;
    flex-direction: column;

    h4 {
      border-bottom: 1px solid #aaa;
      margin: 0;
      margin-bottom: 0.5rem;
      width: 100%;
    }

    p {
      border-bottom: 1px solid #ddd;
      width: 100%;
    }
  }
`

interface PriceCategoryType {
  [key: string]: number
}

const renderPrices = (priceCategory: PriceCategoryType): JSX.Element => {
  const categories: Array<String> = []
  const prices: Array<Number> = []
  for (const [key, value] of Object.entries(priceCategory)) {
    categories.push(key)
    prices.push(value)
  }

  return (
    <PriceCategory>
      <div>
        <h4>Size (mm)</h4>
        {categories.map(value => (
          <p>{value}</p>
        ))}
      </div>
      <div>
        <h4>Price per m³</h4>
        {prices.map(value => (
          <p>R {`${value}`}</p>
        ))}
      </div>
    </PriceCategory>
  )
}

const PriceCategoryConfig = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const PriceCategoryConfigItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;

  h4 {
    display: inline-block;
    margin: 0;
  }
`

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.25rem;
  transition: all 0.3s;

  &:focus {
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #000080;
    outline: none;
  }
`

const renderConfigPrices = (
  priceCategory: PriceCategoryType,
  changeConfiguration: Function,
  type: 'kilnDry' | 'wetOffSaw'
): JSX.Element => {
  const categories = Object.keys(priceCategory)

  const priceCategoryComponents = categories.map((category): JSX.Element => {
    return (
      <PriceCategoryConfigItem>
        <h4>{category}</h4>
        <StyledInput
          onChange={e => changeConfiguration(category, e.target.value, type)}
          onClick={e => {
            const target = e.target as HTMLInputElement
            target.select()
          }}
          type='text'
          value={priceCategory[category]}
        />
      </PriceCategoryConfigItem>
    )
  })

  return <PriceCategoryConfig>{priceCategoryComponents}</PriceCategoryConfig>
}

export const Config = (): JSX.Element => {
  const [activeData, setActiveData] = useState(
    useSelector((state: any) => state.prices)
  )
  const [configData, setConfigData] = useState(activeData)
  const [configuring, setConfiguring] = useState(false)

  const changeConfiguration = (
    key: string,
    value: String,
    category: 'kilnDry' | 'wetOffSaw'
  ): void => {
    const numberVal = Number(value)
    if (Number.isNaN(numberVal)) return

    let newData
    if (category === 'kilnDry') {
      const kilnDry = { ...configData.kilnDry, [key]: numberVal }
      newData = { ...configData, kilnDry: kilnDry }
    } else {
      const wetOffSaw = { ...configData.wetOffSaw, [key]: numberVal }
      newData = { ...configData, wetOffSaw: wetOffSaw }
    }

    setConfigData(newData)
  }

  const changeConfigNails = (value: String): void => {
    const testRegex = /^[0-9]*\.?[0-9]*$/
    if (!value.match(testRegex)) return

    const newData = { ...configData, nails: value }

    setConfigData(newData)
  }

  const changeConfigLabor = (value: String): void => {
    const numberVal = Number(value)
    if (Number.isNaN(numberVal)) return

    const newData = { ...configData, labor: numberVal }

    setConfigData(newData)
  }

  const dispatch = useDispatch()

  const saveConfigData = async (): Promise<void> => {
    try {
      await saveData(configData)
      dispatch(setPrices(configData))
      setActiveData(configData)
      setConfiguring(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {configuring ? (
        <div>
          <h1>Configure prices</h1>
          <ControlContainer>
            <Button onClick={() => setConfiguring(false)}>Back</Button>
            <Button onClick={() => saveConfigData()}>Save</Button>
          </ControlContainer>
          <ContentContainer>
            <div>
              <h4>kiln Dry</h4>
              {renderConfigPrices(
                configData.kilnDry,
                changeConfiguration,
                'kilnDry'
              )}
            </div>
            <div>
              <h4>Wet OffSaw</h4>
              {renderConfigPrices(
                configData.wetOffSaw,
                changeConfiguration,
                'wetOffSaw'
              )}
            </div>
            <div>
              <h4>Misc</h4>
              <PriceCategoryConfigItem>
                <h4>Nails</h4>
                <StyledInput
                  onChange={e => changeConfigNails(e.target.value)}
                  onClick={e => {
                    const target = e.target as HTMLInputElement
                    target.select()
                  }}
                  type='text'
                  value={configData.nails}
                />
              </PriceCategoryConfigItem>
              <PriceCategoryConfigItem>
                <h4>Labor</h4>
                <StyledInput
                  onChange={e => changeConfigLabor(e.target.value)}
                  onClick={e => {
                    const target = e.target as HTMLInputElement
                    target.select()
                  }}
                  type='text'
                  value={configData.labor}
                />
              </PriceCategoryConfigItem>
            </div>
          </ContentContainer>
        </div>
      ) : (
        <div>
          <h1>Current prices</h1>
          <Button onClick={() => setConfiguring(true)}>Configure Prices</Button>
          <ContentContainer>
            <div>
              <h4>kiln Dry</h4>
              {renderPrices(activeData.kilnDry)}
            </div>
            <div>
              <h4>Wet OffSaw</h4>
              {renderPrices(activeData.wetOffSaw)}
            </div>
            <div>
              <h4>Misc</h4>
              <PriceCategory>
                <div>
                  <p>Nails</p>
                </div>
                <div>
                  <p>R {`${activeData.nails}`}</p>
                </div>
              </PriceCategory>
              <PriceCategory>
                <div>
                  <p>Labor</p>
                </div>
                <div>
                  <p>R {`${activeData.labor}`}</p>
                </div>
              </PriceCategory>
            </div>
          </ContentContainer>
        </div>
      )}
      {/* <button
        onClick={() =>
          removeFile('data/prices.json', { dir: BaseDirectory.AppData })
        }
      >
        Scrap config
      </button> */}
    </div>
  )
}
