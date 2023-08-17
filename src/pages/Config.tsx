import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import { saveData } from '../utils/files'
import { setPrices } from '../store/prices'

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
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
  [key: string]: Number
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
        <h4>- Price per m³</h4>
        {prices.map(value => (
          <p>- R {`${value}`}</p>
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
  chageConfiguration: Function,
  type: 'kilmDry' | 'wetOffSaw'
): JSX.Element => {
  const categories: Array<String> = Object.keys(priceCategory)

  const priceCategoryComponents = categories.map(
    (category: String): JSX.Element => {
      return (
        <PriceCategoryConfigItem>
          <h4>{category}</h4>
          <StyledInput
            onChange={e => chageConfiguration(category, e.target.value, type)}
            onClick={e => {
              const target = e.target as HTMLInputElement
              target.select()
            }}
            type='text'
            value={priceCategory[category]}
          />
        </PriceCategoryConfigItem>
      )
    }
  )

  return <PriceCategoryConfig>{priceCategoryComponents}</PriceCategoryConfig>
}

export const Config = (): JSX.Element => {
  const [activeData, setActiveData] = useState(
    useSelector((state: any) => state.prices)
  )
  const [configData, setConfigData] = useState(activeData)
  const [configuring, setConfiguring] = useState(false)

  const chageConfiguration = (
    key: string,
    value: Number,
    category: 'kilmDry' | 'wetOffSaw'
  ): void => {
    const numberVal = Number(value)
    if (Number.isNaN(numberVal)) return

    let newData
    if (category === 'kilmDry') {
      const kilmDry = { ...configData.kilmDry, [key]: numberVal }
      newData = { ...configData, kilmDry: kilmDry }
    } else {
      const wetOffSaw = { ...configData.wetOffSaw, [key]: numberVal }
      newData = { ...configData, wetOffSaw: wetOffSaw }
    }

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
              <h3>Kilm Dry</h3>
              {renderConfigPrices(
                configData.kilmDry,
                chageConfiguration,
                'kilmDry'
              )}
            </div>
            <div>
              <h3>Wet OffSaw</h3>
              {renderConfigPrices(
                configData.wetOffSaw,
                chageConfiguration,
                'wetOffSaw'
              )}
            </div>
          </ContentContainer>
        </div>
      ) : (
        <div>
          <h1>Current prices</h1>
          <Button onClick={() => setConfiguring(true)}>Configure Prices</Button>
          <ContentContainer>
            <div>
              <h3>Kilm Dry</h3>
              {renderPrices(activeData.kilmDry)}
            </div>
            <div>
              <h3>Wet OffSaw</h3>
              {renderPrices(activeData.wetOffSaw)}
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
