import { InputContainer, InputRow, StyledInput } from '../InputFormComponents'
import { Button, Dropdown } from '..'
import { woodSizes } from '../../constants'

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
        <Dropdown
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
        <Dropdown
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
