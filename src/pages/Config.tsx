import { BaseDirectory, removeFile } from '@tauri-apps/api/fs'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../components'

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

interface PriceCategory {
  '19x76': Number
  '19x114': Number
  '25x76': Number
  '25x114': Number
  '38x114': Number
  '50x76': Number
  '76x102': Number
  '76x228': Number
}

const renderPrices = (priceCategory: PriceCategory): JSX.Element => {
  const categories: Array<String> = []
  const prices: Array<String> = []
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
          <p>- R {value}</p>
        ))}
      </div>
    </PriceCategory>
  )
}

export const Config = (): JSX.Element => {
  const [activeData, setActiveData] = useState(
    useSelector((state: any) => state.prices)
  )
  const [configuring, setConfiguring] = useState(false)

  return (
    <div>
      {configuring ? (
        <div>
          <h1>Configure prices</h1>
          <ControlContainer>
            <Button onClick={() => setConfiguring(false)}>Cancel</Button>
            <Button onClick={() => setConfiguring(false)}>Save</Button>
          </ControlContainer>
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
