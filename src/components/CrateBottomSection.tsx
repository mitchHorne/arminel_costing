import styled from 'styled-components'
import { InputContainer, InputRow, StyledInput } from './InputFormComponents'
import { Button } from './Button'
import { woodSizes } from '../constants'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const StyledDropdown = styled(Dropdown)`
  div.Dropdown-control {
    border: 1px solid #333;
    border-radius: 10px;
    margin: 0;
    padding: 0.5rem 0.5rem;
    transition: all 0.3s;
    width: 100%;

    &:hover {
      border: 1px solid #000060;
      box-shadow: 0 0 3px 1px #000060;
      cursor: pointer;
      outline: none;
    }
  }

  div.Dropdown-menu {
    border: 1px solid #55f;
    border-radius: 15px;
  }
`

export default ({
  numberOfBearers,
  bearerSize,
  bottomSlatSizes,
  stepSixError,
  setBaseCrateValues,
  finaliseCrateBase
}: {
  numberOfBearers: number
  bearerSize: string
  bottomSlatSizes: string
  stepSixError: string
  setBaseCrateValues: Function
  finaliseCrateBase: Function
}) => (
  <>
    <h2>Base of Crate</h2>
    <InputContainer>
      <InputRow>
        <h3>Number of bearers</h3>
        <StyledInput
          onChange={e => setBaseCrateValues('numberOfBearers', e.target.value)}
          onClick={e => {
            const target = e.target as HTMLInputElement
            target.select()
          }}
          type='text'
          value={numberOfBearers}
        />
      </InputRow>
      <InputRow>
        <h3>Width and thickness of bearers</h3>
        <StyledDropdown
          options={woodSizes}
          onChange={e => {
            const value: string = e.value
            setBaseCrateValues('bearerSize', value)
          }}
          placeholder='Select bearer width and thickness'
          value={bearerSize}
        />
      </InputRow>
      <InputRow>
        <h3>Width and thickness of bottom slats</h3>
        <StyledDropdown
          options={woodSizes}
          onChange={e => {
            const value: string = e.value
            setBaseCrateValues('bottomSlatSizes', value)
          }}
          placeholder='Select bottom slats width and thickness'
          value={bottomSlatSizes}
        />
      </InputRow>
      {stepSixError && <p style={{ color: 'red' }}>{stepSixError}</p>}
      <Button onClick={() => finaliseCrateBase()}>Finalise crate base</Button>
    </InputContainer>
  </>
)
